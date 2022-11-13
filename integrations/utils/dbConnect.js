const mongoose = require('mongoose');
const mongodb_url = process.env.MONGODB_CONN_STRING;

exports.connection = mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('Error connecting to muxdb' + err.stack);
  });