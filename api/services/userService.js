const userDao = require('../models/userDao');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const getToken = async (authCode) => {
  const response = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=${process.env.GRANT_TYPE}&code=${authCode}&redirect_uri=${process.env.REDIRECT_URI}&client_id=${process.env.CLIENT_ID}`
  );
  const accessToken = await response.data.access_token;
  return accessToken;
};

const getUserInformation = async (accessToken) => {
  const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const userInformation = await response.data.kakao_account;
  return userInformation;
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

const kakaoSignIn = async (email, gender, age, nickname, height, weight) => {
  const user = await getUserByEmail(email);
  if (user) {
    const token = jwt.sign(
      { kakaoEmail: await user.email },
      process.env.JWT_SECRET,
      {
        algorithm: process.env.JWT_ALGORITHM,
      }
    );
    return token;
  } else {
    await userDao.createUsers(email, gender, age, nickname, height, weight);
    const [createdUser] = await userDao.getUserByEmail(email);
    const token = jwt.sign(
      { kakaoEmail: await createdUser.email },
      process.env.JWT_SECRET,
      {
        algorithm: process.env.JWT_ALGORITHM,
      }
    );
    return token;
  }
};

module.exports = {
  getToken,
  getUserInformation,
  calculateAge,
  getUserByEmail,
  kakaoSignIn,
};
