#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Game = require('./models/game');
var GameConsole = require('./models/gameConsole');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var gameConsoles = [];
var games = [];

function gameConsoleCreate(name, developer, description, cb) {
    gameConsoleDetail = { name, developer, description };

    var gameConsole = new GameConsole(gameConsoleDetail);

    gameConsole.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Game Console: ' + gameConsole.name + gameConsole._id);
        gameConsoles.push(gameConsole);
        cb(null, console);
    });
}

function gameCreate(name, description, gameConsoles, price, numberInStock, cb) {
    var game = new Game({
        name,
        description,
        gameConsoles,
        price,
        numberInStock,
    });

    game.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Game: ' + game);
        games.push(game);
        cb(null, game);
    });
}

function createGameConsoles(cb) {
    async.parallel(
        [
            function (callback) {
                // 0
                gameConsoleCreate(
                    'GameCube',
                    'Nintendo',
                    'The GameCube is a home video game console developed and released by Nintendo in Japan on September 14, 2001, in North America on November 18, 2001, and in PAL territories in 2002.',
                    callback
                );
            },
            function (callback) {
                // 1
                gameConsoleCreate(
                    'Wii',
                    'Nintendo',
                    'The Wii is a home video game console developed and marketed by Nintendo. It was first released on November 19, 2006, in North America and in December 2006 for most other regions of the world.',
                    callback
                );
            },
            function (callback) {
                // 2
                gameConsoleCreate(
                    'Switch',
                    'Nintendo',
                    'The Nintendo Switch is a video game console developed by Nintendo and released worldwide in most regions on March 3, 2017.',
                    callback
                );
            },
            function (callback) {
                // 3
                gameConsoleCreate(
                    'Xbox Series X/S',
                    'Microsoft',
                    'The Xbox Series X and the Xbox Series S (collectively, the Xbox Series X/S) are home video game consoles developed by Microsoft. They were both released on November 10, 2020, as the fourth generation of the Xbox console family.',
                    callback
                );
            },
            function (callback) {
                // 4
                gameConsoleCreate(
                    'Xbox One',
                    'Microsoft',
                    'The Xbox One is a line of home video game consoles developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third base console in the Xbox series of video game consoles.',
                    callback
                );
            },
            function (callback) {
                // 5
                gameConsoleCreate(
                    'Playstation 5',
                    'Sony',
                    'The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, with worldwide release following a week later.',
                    callback
                );
            },
            function (callback) {
                // 6
                gameConsoleCreate(
                    'Playstation 4',
                    'Sony',
                    'The PlayStation 4 (PS4) is a home video game console developed by Sony Computer Entertainment. Announced as the successor to the PlayStation 3 in February 2013, it was launched on November 15, 2013, in North America, November 29, 2013 in Europe, South America and Australia, and on February 22, 2014 in Japan.',
                    callback
                );
            },
            function (callback) {
                // 7
                gameConsoleCreate(
                    'Playstation 3',
                    'Sony',
                    'The PlayStation 3 (PS3) is a home video game console developed by Sony Computer Entertainment. The successor to PlayStation 2, it is part of the PlayStation brand of consoles. It was first released on November 11, 2006, in Japan,[9] November 17, 2006, in North America, and March 23, 2007, in Europe and Australia',
                    callback
                );
            },
            function (callback) {
                // 8
                gameConsoleCreate(
                    'Xbox 360',
                    'Microsoft',
                    'The Xbox 360 is a home video game console developed by Microsoft. As the successor to the original Xbox, it is the second console in the Xbox series.',
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

function createGames(cb) {
    async.parallel(
        [
            function (callback) {
                gameCreate(
                    'Dragon Age: Origins',
                    'Dragon Age: Origins is a role-playing game developed by BioWare and published by Electronic Arts. It is the first game in the Dragon Age franchise. Set in the fictional kingdom of Ferelden during a period of civil strife, the game puts the player in the role of a warrior, mage, or rogue coming from an elven, human, or dwarven background.',
                    [gameConsoles[7], gameConsoles[8]],
                    10,
                    3,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Life is Strange: True Colors',
                    `Life Is Strange: True Colors is a graphic adventure video game developed by Deck Nine and published by Square Enix's European subsidiary. The plot focuses on Alex Chen, a young woman who can experience the emotions of others, as she tries to solve the mystery behind her brother's death.`,
                    [
                        gameConsoles[3],
                        gameConsoles[4],
                        gameConsoles[5],
                        gameConsoles[6],
                    ],
                    60,
                    10,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Dragon Age: Inquisition',
                    'Dragon Age: Inquisition is a 2014 action role-playing video game developed by BioWare and published by Electronic Arts. The third major game in the Dragon Age franchise, Inquisition is the sequel to Dragon Age II (2011). The story follows a player character known as the Inquisitor on a journey to settle the civil unrest in the continent of Thedas and close a mysterious tear in the sky called the "Breach", which is unleashing dangerous demons upon the world.',
                    [
                        gameConsoles[7],
                        gameConsoles[8],
                        gameConsoles[4],
                        gameConsoles[6],
                    ],
                    40,
                    5,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Kingdom Hearts III',
                    `Kingdom Hearts III is a 2019 action role-playing game developed and published by Square Enix. It is the twelfth installment in the Kingdom Hearts series, and serves as a conclusion of the "Dark Seeker Saga" story arc that began with the original game.`,
                    [gameConsoles[6], gameConsoles[4], gameConsoles[2]],
                    60,
                    11,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'New Pokémon Snap',
                    'New Pokémon Snap[a] is an on-rails first-person photography game developed by Bandai Namco Studios and published by Nintendo and The Pokémon Company.',
                    [gameConsoles[2]],
                    60,
                    20,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Kingdom Hearts',
                    `Kingdom Hearts is a crossover of various Disney properties based in an original fictional universe. The series centers on the main character, Sora, and his journey and experiences with various Disney and Pixar characters, as well as some from Square Enix properties, such as Final Fantasy, The World Ends With You, and Einhänder, in addition to original characters and locations created specifically for the series.`,
                    [
                        gameConsoles[2],
                        gameConsoles[4],
                        gameConsoles[7],
                        gameConsoles[6],
                    ],
                    20,
                    4,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Mario Kart Wii',
                    'Mario Kart Wii[a] is a 2008 kart racing video game developed and published by Nintendo for the Wii. It is the sixth installment in the Mario Kart series. Mario Kart Wii was released worldwide in April 2008.',
                    [gameConsoles[1]],
                    35,
                    4,
                    callback
                );
            },
            function (callback) {
                gameCreate(
                    'Animal Crossing',
                    `Animal Crossing is an endless and non-linear game in which a human takes up residence in a village inhabited by anthropomorphic animals. The main goal of the game is to save money in order to pay off the mortgage on the human's house.`,
                    [gameConsoles[0]],
                    500,
                    1,
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

async.series(
    [createGameConsoles, createGames],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);
