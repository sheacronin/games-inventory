const GameConsole = require('../models/gameConsole');
const Game = require('../models/game');
const async = require('async');
const { body, validationResult } = require('express-validator');

// Display list of all consoles
exports.gameConsoleList = (req, res) => {
    GameConsole.find()
        .sort([
            ['developer', 'ascending'],
            ['name', 'ascending'],
        ])
        .exec((err, gameConsoles) => {
            if (err) return next(err);
            res.render('console_list', { title: 'Consoles', gameConsoles });
        });
};

// Display detail page of console with its games
exports.gameConsoleDetail = (req, res) => {
    async.parallel(
        {
            gameConsole: (callback) => {
                GameConsole.findById(req.params.id).exec(callback);
            },
            games: (callback) => {
                Game.find({ gameConsoles: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) return next(err);
            if (results.gameConsole == null) {
                var err = new Error('Console not found');
                err.status = 404;
                return next(err);
            }
            const { gameConsole, games } = results;
            res.render('console_detail', {
                title: results.gameConsole.name,
                gameConsole,
                games,
            });
        }
    );
};

// Display console create page on GET
exports.gameConsoleCreateGet = (req, res) => {
    res.render('console_form', { title: 'Add a console' });
};

// Handle console create on POST
exports.gameConsoleCreatePost = [
    body('name', 'Name must be specified')
        .trim()
        .isLength({ min: 2, max: 100 })
        .escape(),
    body('description', 'Description must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('developer', 'Developer must be specified').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const gameConsole = new GameConsole({
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
        });

        if (!errors.isEmpty()) {
            res.render('console_form', {
                title: 'Add a console',
                gameConsole,
                errors: errors.array(),
            });
            return;
        } else {
            GameConsole.findOne({ name: gameConsole.name }).exec(
                (err, foundGameConsole) => {
                    if (err) return next(err);

                    if (foundGameConsole) {
                        res.redirect(foundGameConsole.url);
                    } else {
                        gameConsole.save((err) => {
                            if (err) return next(err);

                            res.redirect(gameConsole.url);
                        });
                    }
                }
            );
        }
    },
];

// Display console delete form on GET
exports.gameConsoleDeleteGet = (req, res) => {
    async.parallel(
        {
            gameConsole: (callback) => {
                GameConsole.findById(req.params.id).exec(callback);
            },
            consoleGames: (callback) => {
                Game.find({ gameConsoles: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) return next(err);

            if (results.gameConsole == null) {
                res.redirect('/consoles');
            }

            const { gameConsole, consoleGames } = results;
            res.render('console_delete', {
                title: 'Delete console',
                gameConsole,
                consoleGames,
            });
        }
    );
};

// Handle console delete on POST
exports.gameConsoleDeletePost = (req, res) => {
    // Delete any games that are only available on this console.
    Game.deleteMany({
        gameConsoles: { $eq: [req.body.gameconsoleid] },
    });

    Game.updateMany(
        { gameConsoles: req.body.gameconsoleid },
        { $pull: { gameConsoles: req.params.gameconsoleid } }
    );

    GameConsole.findByIdAndRemove(
        req.body.gameconsoleid,
        function deleteGameConsole(err) {
            if (err) return next(err);

            res.redirect('/consoles');
        }
    );
};

// Display console update form on GET
exports.gameConsoleUpdateGet = (req, res) => {
    GameConsole.findById(req.params.id).exec((err, gameConsole) => {
        if (err) return next(err);
        if (gameConsole == null) {
            var err = new Error('Game console not found');
            err.status = 404;
            return next(err);
        }

        res.render('console_form', { title: 'Update console', gameConsole });
    });
};

// Handle conosle update on POST
exports.gameConsoleUpdatePost = [
    body('name', 'Name must be specified')
        .trim()
        .isLength({ min: 2, max: 100 })
        .escape(),
    body('description', 'Description must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('developer', 'Developer must be specified').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const gameConsole = new GameConsole({
            name: req.body.name,
            description: req.body.description,
            developer: req.body.developer,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render('console_form', {
                title: 'Add a console',
                gameConsole,
                errors: errors.array(),
            });
            return;
        } else {
            GameConsole.findByIdAndUpdate(
                req.params.id,
                gameConsole,
                {},
                (err, thegameConsole) => {
                    if (err) return next(err);

                    res.redirect(thegameConsole.url);
                }
            );
        }
    },
];
