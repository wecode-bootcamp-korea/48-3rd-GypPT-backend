const express = require('express');
const { userRouter } = require('./userRouter');
const { trainerRouter } = require('./trainerRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/trainers', trainerRouter);

module.exports = { router };
