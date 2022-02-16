var express = require('express');
var router = express.Router();
const gameController = require('../controllers/gameController');
const gameConsoleController = require('../controllers/gameConsoleController');
const path = require('path');

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { db } = require('../db-connection');

const storage = new GridFsStorage({
    db: db,
    file: (req, file) => {
        return {
            filename: Date.now() + '_' + file.originalname,
            bucketName: 'posters',
        };
    },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', gameController.index);

// Get files
router.get('/file/:filename', gameController.file);

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

router.get('/games', gameController.gameList);

router.get('/game/create', gameController.gameCreateGet);
router.post(
    '/game/create',
    upload.single('poster'),
    gameController.gameCreatePost
);

router.get('/game/:id', gameController.gameDetail);

router.get('/game/:id/update', gameController.gameUpdateGet);
router.post(
    '/game/:id/update',
    upload.single('poster'),
    gameController.gameUpdatePost
);

router.get('/game/:id/delete', gameController.gameDeleteGet);
router.post('/game/:id/delete', gameController.gameDeletePost);

module.exports = router;
