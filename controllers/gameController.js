const Game = require('../models/game');

// Display detail page of game
exports.gameDetail = (req, res) => {
    res.send('NOT IMPLEMENTED: Game detail: ' + req.params.id);
};

// Display game create page on GET
exports.gameCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game create GET');
};

// Handle game create on POST
exports.gameCreatePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game create POST');
};

// Display game delete form on GET
exports.gameDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game delete GET');
};

// Handle game delete on POST
exports.gameDeletePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game delete POST');
};

// Display game update form on GET
exports.gameUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game update GET');
};

// Handle game update on POST
exports.gameUpdatePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game update POST');
};
