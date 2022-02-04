const GameConsole = require('../models/gameConsole');
const Game = require('../models/game');
const async = require('async');

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
