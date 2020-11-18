require("../setenv.js");
const path = require("path");
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const conn = require("./config/database");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(helmet());
app.use(compression());

app.enable("trust proxy");

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const router = express.Router();

const pythonScript = require("./config/python-scripts");
const RespuestaModel = require("./models/respuesta");
const OracionModel = require("./models/oracion");

app.use(
  "/api/mensaje",
  router.post("/post", async (req, res, next) => {
    try {
      let oracion_corregida = await pythonScript.spell({
        oracion: req.body.mensaje,
      });

      console.log(oracion_corregida);

      let intencion = await pythonScript.intencion({
        // oracion: req.body.mensaje,
        oracion: oracion_corregida,
      });

      let subintencion = "todas";

      if (intencion.intencion == "pagos")
        subintencion = await pythonScript.subintencion_pagos({
          // oracion: req.body.mensaje,
          oracion: oracion_corregida,
        });
      else if (intencion.intencion == "tramites")
        subintencion = await pythonScript.subintencion_tramites({
          // oracion: req.body.mensaje,
          oracion: oracion_corregida,
        });

      let carrera = await pythonScript.carrera({ oracion: req.body.mensaje });
      //   let carrera = 'todas'
      let w5 = await pythonScript.w5({
        // oracion: req.body.mensaje,
        oracion: oracion_corregida,
      });
      // console.log(intencion)

      let respuesta = await RespuestaModel.findOne({
        intencion: intencion.intencion,
        subintencion: subintencion.subintencion,
        carrera: carrera.carrera,
        w5: w5.w5,
      });

      res.status(200).json({
        intencion,
        subintencion,
        carrera,
        respuesta,
        oracion: req.body.mensaje,
      });
    } catch (err) {
      next(err);
    }
  })
);

app.use(
  "/api/mensaje",
  router.post("/feedback", async (req, res, next) => {
    try {
      let oracion = new OracionModel({
        oracion: req.body.oracion,
        intencion: req.body.intencion,
        subintencion: req.body.subintencion,
        carrera: req.body.carrera,
        w5: req.body.w5,
        feedback: true,
      });

      oracion.save().then();

      res.status(200).json();
    } catch (err) {
      next(err);
    }
  })
);

//static files
if (process.env.STATICS_FILES) {
  let urlStaticsApp = process.env.STATICS_FILES;
  app.use(express.static(urlStaticsApp));

  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve(urlStaticsApp + "/index.html"));
  });
}

// Catch general errors
app.use(function (err, req, res, next) {
  res.status(500);
  console.error(err);
  res.json({ message: err.name + ": " + err.message });
});

// starting the server
const server = app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
