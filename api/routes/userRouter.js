const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/kakaoSignIn', userController.kakaoSignIn);

module.exports = { userRouter };
