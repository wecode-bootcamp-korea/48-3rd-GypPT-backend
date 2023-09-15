const express = require('express');
const userController = require('../controllers/userController');
const { loginRequired } = require('../utils/auth');

const userRouter = express.Router();

userRouter.post('/kakaoSignIn', userController.kakaoSignIn);
userRouter.post('/kakaoSignUp', userController.kakaoSignUp);
userRouter.post('/duplicateNickname', userController.checkDuplicateNickname);
module.exports = { userRouter };
