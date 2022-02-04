const GameConsole = require('../models/gameConsole');

// Display list of all consoles
exports.gameConsoleList = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console list');
};

// Display detail page of console with its games
exports.gameConsoleDetail = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console detail: ' + req.params.id);
};

// Display console create page on GET
exports.gameConsoleCreateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console create GET');
};

// Handle console create on POST
exports.gameConsoleCreatePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console create POST');
};

// Display console delete form on GET
exports.gameConsoleDeleteGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console delete GET');
};

// Handle console delete on POST
exports.gameConsoleDeletePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console delete POST');
};

// Display console update form on GET
exports.gameConsoleUpdateGet = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console update GET');
};

// Handle conosle update on POST
exports.gameConsoleUpdatePost = (req, res) => {
    res.send('NOT IMPLEMENTED: Game console update POST');
};
