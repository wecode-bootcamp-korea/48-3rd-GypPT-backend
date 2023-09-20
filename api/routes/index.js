const express = require('express');
const { userRouter } = require('./userRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');
const { consultantRouter } = require('./consultantRouter');
const { postRouter } = require('./postRouter');
const { paymentRouter } = require('./paymentRouter');

const router = express.Router();

router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);
router.use('/consultant', consultantRouter);
router.use('/user', userRouter);
router.use('/community', postRouter);
router.use('/payments', paymentRouter);

module.exports = { router };
