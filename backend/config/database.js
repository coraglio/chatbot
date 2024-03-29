const mongoose = require("mongoose");
// const URI = 'mongodb://localhost/chatbot';
const URI = process.env.DB_STRING;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("db is connected");
  })
  .catch((err) => console.error(err));

module.exports = mongoose.connection;
