const userService = require('../services/userService');

const kakaoSignIn = async (req, res) => {
  try {
    const authCode = await req.query.code;
    const { nickname, height, weight } = await req.body;
    const accessToken = await userService.getToken(authCode);
    const userInformation = await userService.getUserInformation(accessToken);
    const { email, birthyear, birthday, gender } = await userInformation;
    const age = await userService.calculateAge(birthyear, birthday);
    const token = await userService.kakaoSignIn(
      email,
      gender,
      age,
      nickname,
      height,
      weight
    );
    await res.json({ authorization: token, message: 'SIGN IN COMPLETED' });
  } catch (err) {
    res.json({ message: 'SIGN IN FAILED' });
  }
};

module.exports = { kakaoSignIn };
