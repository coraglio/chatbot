const spawn = require('child_process').spawn

class pythonScripts {
    static python_file = process.env.PYTHON_FILE ? process.env.PYTHON_FILE : '';
    static python = process.env.PYTHON? process.env.PYTHON : 'python';

    static execute(metod, params) {
        let promise = new Promise((resolve, reject) => {
            let argsv = [pythonScripts.python_file, metod, JSON.stringify(params)];
            let script = spawn(pythonScripts.python, argsv);

            script.stdout.on('data', (data) => {
                // console.log(data.toString())
                try{
                    let res = JSON.parse(data);
                    resolve(res);
                }
                catch(err){
                    console.error(err)
                    resolve(null)
                }                
            })

            script.stderr.on('data', (data) => {
                // reject(data);
                console.log(data.toString())
                resolve(null)
            });

            setTimeout(function () {
                reject("Timed out");
            }, 30000);
        });

        return promise;
    }

    static intencion = async (params) => {
        let res = await pythonScripts.execute('intencion', params);

        return res;
    }

    static subintencion = async (params) => {
        let res = await pythonScripts.execute('subintencion', params);

        return res;
    }

    static carrera = async (params) => {
        let res = await pythonScripts.execute('carrera', params);

        return res;
    }

    static w5 = async (params) => {
        let res = await pythonScripts.execute('w5', params);

        return res;
    }

    static spell = async(params)=>{
        let res = await pythonScripts.execute('spell', params);

        return res;
    }
}

module.exports = pythonScripts