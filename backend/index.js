
require('../setenv.js');
const path = require('path');
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const conn = require('./config/database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(helmet());
app.use(compression());

app.enable('trust proxy');

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const router = express.Router();

const pythonScript = require('./config/python-scripts');
const RespuestaModel = require('./models/respuesta')


app.use('/api/mensaje', router.post('/post', async (req, res, next) => {
    try {
        // console.log(req.body)
        let intencion = await pythonScript.intencion({ oracion: req.body.mensaje })
        let subintencion = await pythonScript.subintencion({ oracion: req.body.mensaje })
        let carrera = await pythonScript.carrera({ oracion: req.body.mensaje })
        // console.log(intencion)

        let respuesta = await RespuestaModel.findOne({
            intencion: intencion.intencion,
            subintencion: subintencion.subintencion,
            carrera: carrera.carrera
        })

        res.status(200).json({intencion, subintencion, carrera, respuesta});
    } catch (err) {
        next(err);
    }
}));

//static files
if (process.env.STATICS_FILES) {
    let urlStaticsApp = process.env.STATICS_FILES
    app.use(express.static(urlStaticsApp));

    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve(urlStaticsApp + '/index.html'));
    });
}

// Catch general errors
app.use(function (err, req, res, next) {
    res.status(500)
    console.error(err);
    res.json({ "message": err.name + ": " + err.message });
});

// starting the server
const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});