const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    description: { type: String, required: true },
});

ConsoleSchema.virtual('url').get(function () {
    return '/console/' + this._id;
});

module.exports = mongoose.model('Console', ConsoleSchema);
