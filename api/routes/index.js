const express = require('express');
const router = express.Router();

const { userRouter } = require('./userRouter');
const { trainerRouter } = require('./trainerRouter');
const { managementRouter } = require('./managementRouter');
const { consultantRouter } = require("./consultantRouter")


router.use('/user', userRouter);
router.use('/trainers', trainerRouter);
router.use('/custom', managementRouter);
router.use("/consultant", consultantRouter);




module.exports = { router }
