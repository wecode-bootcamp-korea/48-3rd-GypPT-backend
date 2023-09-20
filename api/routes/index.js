const express = require('express');
const { userRouter } = require('./userRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');

const router = express.Router();

router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);
router.use("/consultant", consultantRouter);
router.use('/users', userRouter);
router.use('/community', postRouter);
router.use('/payments', paymentRouter);

module.exports = { router };
