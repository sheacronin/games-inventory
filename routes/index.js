var express = require('express');
var router = express.Router();
const gameController = require('../controllers/gameController');
const gameConsoleController = require('../controllers/gameConsoleController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// Game Consoles

router.get('/consoles', gameConsoleController.gameConsoleList);

router.get('/console/create', gameConsoleController.gameConsoleCreateGet);
router.post('/console/create', gameConsoleController.gameConsoleCreatePost);

router.get('/console/:id', gameConsoleController.gameConsoleDetail);

router.get('/console/:id/update', gameConsoleController.gameConsoleUpdateGet);
router.post('/console/:id/update', gameConsoleController.gameConsoleUpdatePost);

router.get('/console/:id/delete', gameConsoleController.gameConsoleDeleteGet);
router.post('/console/:id/delete', gameConsoleController.gameConsoleDeletePost);

// Games

router.get('/game/create', gameController.gameCreateGet);
router.post('/game/create', gameController.gameCreatePost);

router.get('/game/:id', gameController.gameDetail);

router.get('/game/:id/update', gameController.gameUpdateGet);
router.post('/game/:id/update', gameController.gameUpdatePost);

router.get('/game/:id/delete', gameController.gameDeleteGet);
router.post('/game/:id/delete', gameController.gameDeletePost);

module.exports = router;
