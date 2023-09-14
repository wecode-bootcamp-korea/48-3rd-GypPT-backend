const express = require('express');
const { userRouter } = require('./userRouter');
const { postRouter } = require('./postRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');
const { paymentRouter } = require('./paymentRouter');

const router = express.Router();

router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);
router.use('/users', userRouter);
router.use('/community', postRouter);
router.use('/payments', paymentRouter);

module.exports = { router };
