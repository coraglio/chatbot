const path = require('path');

process.env.PYTHON = "python"
process.env.PYTHON_FILE = path.resolve(__dirname, "./python/init.py")
// process.env.STATICS_FILES = path.join(__dirname, './frontend/dist');