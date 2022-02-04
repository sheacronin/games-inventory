const Game = require('../models/game');

// Display detail page of game
exports.gameDetail = (req, res) => {
    Game.findById(req.params.id)
        .populate('gameConsoles')
        .exec((err, game) => {
            if (err) return next(err);
            if (game == null) {
                var err = new Error('Game not found');
                err.status = 404;
                return next(err);
            }
            res.render('game_detail', { title: game.name, game });
        });
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
