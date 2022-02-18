//Set up mongoose connection
var mongoose = require('mongoose');
var devDbUrl = process.env.MONGODB_DEV;
var mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

exports.db = db;
