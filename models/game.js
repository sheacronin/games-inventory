const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    description: { type: String, required: true },
    consoles: [{ type: Schema.Types.ObjectId, ref: 'Console', required: true }],
    price: { type: Number, required: true },
    numberInStock: { type: Number, required: true },
});

GameSchema.virtual('url').get(function () {
    return '/game/' + this._id;
});

module.exports = mongoose.model('Game', GameSchema);
