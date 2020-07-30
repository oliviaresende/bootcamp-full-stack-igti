const mongoose = require('mongoose');
require('dotenv/config');

const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;