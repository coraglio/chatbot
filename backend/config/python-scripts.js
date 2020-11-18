const spawn = require("child_process").spawn;

class pythonScripts {
  static execute(metod, params) {
    let python_file = process.env.PYTHON_FILE ? process.env.PYTHON_FILE : "";
    let python = process.env.PYTHON ? process.env.PYTHON : "python";
    let promise = new Promise((resolve, reject) => {
      let argsv = [python_file, metod, JSON.stringify(params)];
      let script = spawn(python, argsv);

      script.stdout.on("data", (data) => {
        // console.log(data.toString())
        try {
          let res = JSON.parse(data);
          resolve(res);
        } catch (err) {
          console.error(err);
          resolve(null);
        }
      });

      script.stderr.on("data", (data) => {
        // reject(data);
        console.log(data.toString());
        resolve(null);
      });

      setTimeout(function () {
        reject("Timed out");
      }, 60000);
    });

    return promise;
  }

  static intencion = async (params) => {
    let res = await pythonScripts.execute("intencion", params);

    return res;
  };

  static subintencion_pagos = async (params) => {
    let res = await pythonScripts.execute("subintencion_pagos", params);

    return res;
  };

  static subintencion_tramites = async (params) => {
    let res = await pythonScripts.execute("subintencion_tramites", params);

    return res;
  };

  static carrera = async (params) => {
    let res = await pythonScripts.execute("carrera", params);

    return res;
  };

  static w5 = async (params) => {
    let res = await pythonScripts.execute("w5", params);

    return res;
  };

  static spell = async (params) => {
    let res = await pythonScripts.execute("spell", params);

    return res;
  };
}

module.exports = pythonScripts;
