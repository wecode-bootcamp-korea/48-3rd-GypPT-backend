const express = require('express');
const router = express.Router();

const { userRouter } = require('./userRouter');
const { postRouter } = require('./postRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');
const { consultantRouter } = require("./consultantRouter")
const { paymentRouter } = require('./paymentRouter');


router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);
router.use("/consultant", consultantRouter);
router.use('/users', userRouter);
router.use('/community', postRouter);
router.use('/payments', paymentRouter);




module.exports = { router }
