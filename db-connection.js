//Set up mongoose connection
var mongoose = require('mongoose');
var devDbUrl =
    'mongodb+srv://shea:nugk58qg3zEEDxSF@cluster0.tbvdy.mongodb.net/games_inventory?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

exports.db = db;
