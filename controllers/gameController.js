const Game = require('../models/game');
const GameConsole = require('../models/gameConsole');
const async = require('async');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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
    GameConsole.find({}, 'name').exec((err, gameConsoles) => {
        if (err) return next(err);

        res.render('game_form', { title: 'Add a game', gameConsoles });
    });
};

// Handle game create on POST
exports.gameCreatePost = [
    (req, res, next) => {
        if (!(req.body.gameConsoles instanceof Array)) {
            if (typeof req.body.gameConsoles === 'undefined') {
                req.body.gameConsoles = [];
            } else {
                req.body.gameConsoles = new Array(req.body.gameConsoles);
            }
        }
        next();
    },

    body('name', 'Name must be specified')
        .trim()
        .isLength({ min: 2, max: 100 })
        .escape(),
    body('description', 'Description must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('gameConsoles.*').escape(),
    body('price', 'Price must be specified').escape(),
    body('numberInStock', 'Number in stock must be specified').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const game = new Game({
            name: req.body.name,
            description: req.body.description,
            gameConsoles: req.body.gameConsoles,
            price: req.body.price,
            numberInStock: req.body.numberInStock,
            posterFileName: req.file.filename,
        });

        if (!errors.isEmpty()) {
            GameConsole.find({}, 'name').exec((err, gameConsoles) => {
                if (err) return next(err);

                for (let i = 0; i < gameConsoles.length; i++) {
                    if (game.gameConsoles.indexOf(gameConsoles[i]._id) > -1) {
                        gameConsoles[i].checked = 'true';
                    }
                }

                res.render('game_form', {
                    title: 'Add a game',
                    gameConsoles,
                    game,
                    errors: errors.array(),
                });
            });
            return;
        } else {
            game.save((err) => {
                if (err) return next(err);

                res.redirect(game.url);
            });
        }
    },
];

// Display game delete form on GET
exports.gameDeleteGet = (req, res) => {
    Game.findById(req.params.id)
        .populate('gameConsoles')
        .exec((err, game) => {
            if (err) return next(err);

            if (game == null) {
                res.redirect('/');
            }
            res.render('game_delete', { title: 'Delete game', game });
        });
};

// Handle game delete on POST
exports.gameDeletePost = (req, res) => {
    Game.findById(req.body.gameid)
        .populate('gameConsoles')
        .exec((err, game) => {
            if (err) return next(err);

            Game.findByIdAndRemove(req.body.gameid, function deleteGame(err) {
                if (err) return next(err);

                res.redirect('/');
            });
        });
};

// Display game update form on GET
exports.gameUpdateGet = (req, res) => {
    async.parallel(
        {
            game: (callback) => {
                Game.findById(req.params.id)
                    .populate('gameConsoles')
                    .exec(callback);
            },
            gameConsoles: (callback) => {
                GameConsole.find(callback);
            },
        },
        (err, results) => {
            if (err) return next(err);

            if (results.game == null) {
                var err = new Error('Game not found');
                err.status = 404;
                return next(err);
            }

            const { game, gameConsoles } = results;

            // Mark our selected consoles as checked
            for (var gcIter = 0; gcIter < gameConsoles.length; gcIter++) {
                for (
                    var thisGCIter = 0;
                    thisGCIter < game.gameConsoles.length;
                    thisGCIter++
                ) {
                    if (
                        gameConsoles[gcIter]._id.toString() ===
                        game.gameConsoles[thisGCIter]._id.toString()
                    ) {
                        gameConsoles[gcIter].checked = 'true';
                    }
                }
            }

            res.render('game_form', {
                title: 'Update game',
                game,
                gameConsoles,
            });
        }
    );
};

// Handle game update on POST
exports.gameUpdatePost = [
    (req, res, next) => {
        if (!(req.body.gameConsoles instanceof Array)) {
            if (typeof req.body.gameConsoles === 'undefined') {
                req.body.gameConsoles = [];
            } else {
                req.body.gameConsoles = new Array(req.body.gameConsoles);
            }
        }
        next();
    },

    body('name', 'Name must be specified')
        .trim()
        .isLength({ min: 2, max: 100 })
        .escape(),
    body('description', 'Description must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('gameConsoles.*').escape(),
    body('price', 'Price must be specified').escape(),
    body('numberInStock', 'Number in stock must be specified').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const game = new Game({
            name: req.body.name,
            description: req.body.description,
            gameConsoles: req.body.gameConsoles,
            price: req.body.price,
            numberInStock: req.body.numberInStock,
            posterFileName: req.file.filename,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            GameConsole.find({}, 'name').exec((err, gameConsoles) => {
                if (err) return next(err);

                for (let i = 0; i < gameConsoles.length; i++) {
                    if (game.gameConsoles.indexOf(gameConsoles[i]._id) > -1) {
                        gameConsoles[i].checked = 'true';
                    }
                }

                res.render('game_form', {
                    title: 'Add a game',
                    gameConsoles,
                    game,
                    errors: errors.array(),
                });
            });
            return;
        } else {
            Game.findById(req.params.id).exec((err, oldGame) => {
                if (err) return next(err);
                // Remove old poster image.
                const oldImagePath = path.join(
                    __dirname,
                    '../public/images/',
                    oldGame.posterFileName
                );

                fs.unlink(oldImagePath, (err) => {
                    console.log(err);
                });
            });

            Game.findByIdAndUpdate(req.params.id, game, {}, (err, thegame) => {
                if (err) return next(err);

                res.redirect(thegame.url);
            });
        }
    },
];
