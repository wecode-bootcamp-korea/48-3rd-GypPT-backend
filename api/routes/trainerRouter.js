const express = require('express');

const trainerController = require('../controllers/trainerController');

const trainerRouter = express.Router();

trainerRouter.get('/list', trainerController.getTrainerList);

module.exports = { trainerRouter };
