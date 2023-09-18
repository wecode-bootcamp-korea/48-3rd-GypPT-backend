const express = require('express');
const userController = require('../controllers/userController');
const { loginRequired } = require('../utils/auth');

const userRouter = express.Router();

userRouter.post('/kakao-sign-in', userController.kakaoSignIn);
userRouter.post('/kakao-sign-up', userController.kakaoSignUp);
userRouter.post('/duplicate-nickname', userController.checkDuplicateNickname);
module.exports = { userRouter };
