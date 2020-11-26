const path = require('path');

// process.env.PYTHON = path.resolve(__dirname, "./venv/bin/python")
process.env.PYTHON = "/home/federico/anaconda3/bin/python"
process.env.PYTHON_FILE = path.resolve(__dirname, "./python/init.py")
// process.env.STATICS_FILES = path.join(__dirname, './frontend/dist');
process.env.DB_STRING = "mongodb+srv://federico:uUmQB7B1sF5ytXg8@cluster0.ix9a2.mongodb.net/chatbot?retryWrites=true&w=majority"