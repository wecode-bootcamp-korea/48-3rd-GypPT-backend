const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const getRedirectUri = async (endPoint) => {
  switch (endPoint) {
    case '/kakaoSignIn':
      return process.env.SIGN_IN_REDIRECT_URI;
    case '/kakaoSignUp':
      return process.env.SIGN_UP_REDIRECT_URI;
  }
};

const getKaKaoAccessToken = async (authCode, redirectUri) => {
  try {
    const response = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${process.env.GRANT_TYPE}&code=${authCode}&redirect_uri=${redirectUri}&client_id=${process.env.CLIENT_ID}`
    );
    const kakaoAccessToken = await response.data.access_token;
    return kakaoAccessToken;
  } catch (err) {
    const message = err.response.data.error;
    err.statusCode = err.response.status;
    err.message = message;
    throw err;
  }
};

const getUserInformation = async (kakaoAccessToken) => {
  try {
    const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: { Authorization: `Bearer ${kakaoAccessToken}` },
    });
    const userInformation = await response.data.kakao_account;
    return userInformation;
  } catch (err) {
    const message = err.response.data.error;
    err.statusCode = err.response.status;
    err.message = message;
    throw err;
  }
};

const calculateAge = async (birthyear, birthday) => {
  const today = new Date();
  const birthMonth = birthday.slice(0, 2);
  const birthDate = birthday.slice(2, 4);
  const age =
    (birthMonth - today.getMonth >= 0) & (birthDate - today.getDate() >= 0)
      ? today.getFullYear() - birthyear
      : today.getFullYear() - birthyear - 1;
  return age;
};

const getUserByEmail = async (email) => {
  const [user] = await userDao.getUserByEmail(email);
  return user;
};

const getUserType = async (email) => {
  const { user_type: userType } = await userDao.getUserType(email);
  return userType;
};

const createToken = async (email) => {
  const { email: mail } = await getUserByEmail(email);
  const userType = await getUserType(email);
  const grade = await getGrade(userType, email);
  const token = jwt.sign(
    { email: mail, userType: userType, grade: grade },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.JWT_ALGORITHM,
    }
  );
  return token;
};

const createUser = async (email, gender, age) => {
  await userDao.createUser(email, gender, age);
};

const checkDuplicateNickname = async (nickname) => {
  const result = await userDao.checkDuplicateNickname(nickname);
  return result;
};

const addAdditionalInfo = async (email, nickname, height, weight) => {
  await userDao.addAdditionalInfo(email, nickname, height, weight);
};

const getGrade = async (userType, email) => {
  const { grade: userGrade } = await userDao.getGrade(userType, email);
  return userGrade;
};

module.exports = {
  getRedirectUri,
  getKaKaoAccessToken,
  getUserInformation,
  calculateAge,
  getUserByEmail,
  getUserType,
  createToken,
  createUser,
  checkDuplicateNickname,
  addAdditionalInfo,
  getGrade,
};
