const express = require('express');
const { userRouter } = require('./userRouter');
const { postRouter } = require('./postRouter');
const { trainerRouter } = require('./trainerRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/community', postRouter);
router.use('/trainers', trainerRouter);

module.exports = { router };
