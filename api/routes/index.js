const express = require('express');
const { userRouter } = require('./userRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);

module.exports = { router };
