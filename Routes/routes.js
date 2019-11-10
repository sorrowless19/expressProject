var express = require('express')
var router = express.Router()
const authController = require('../AppController/authController')
const middleware = require('../AppController/MiddlewareController')
const GameIdeaController = require('../AppController/GameIdeaController')
router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/GamesIdea',middleware.middleware,GameIdeaController.showGamesIdea);
router.post('/GamesIdea/add',middleware.middleware,GameIdeaController.AddGamesIdea);
module.exports = router;