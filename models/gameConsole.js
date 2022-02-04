const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameConsoleSchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    developer: { type: String, required: true },
    description: { type: String, required: true },
});

GameConsoleSchema.virtual('url').get(function () {
    return '/console/' + this._id;
});

module.exports = mongoose.model('GameConsole', GameConsoleSchema);
