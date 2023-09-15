const userService = require('../services/userService');
const { catchAsync } = require('../utils/error');

const kakaoSignIn = catchAsync(async (req, res) => {
  const authCode = await req.query.code;
  const endPoint = await req.path;
  const redirectUri = await userService.getRedirectUri(endPoint);
  const kakaoAccessToken = await userService.getKaKaoAccessToken(
    authCode,
    redirectUri
  );
  const { email, gender, birthyear, birthday } =
    await userService.getUserInformation(kakaoAccessToken);
  const age = await userService.calculateAge(birthyear, birthday);
  const user = await userService.getUserByEmail(email);
  if (!user) {
    await userService.createUser(email, gender, age);
    await res.status(401).json({
      message: 'SIGN UP REQUIRED',
    });
  } else if (
    user.email &&
    user.age &&
    user.gender &&
    !user.nickname &&
    !user.height &&
    !user.weight
  ) {
    await res.status(401).json({
      message: 'SIGN UP REQUIRED',
    });
  } else if (
    user.email &&
    user.age &&
    user.gender &&
    user.nickname &&
    user.height &&
    user.weight
  ) {
    const token = await userService.createToken(email);
    await res
      .status(200)
      .json({ authorization: token, message: 'SIGN IN COMPLETED' });
  }
});

const kakaoSignUp = catchAsync(async (req, res) => {
  const authCode = await req.query.code;
  const endPoint = await req.path;
  const redirectUri = await userService.getRedirectUri(endPoint);
  const kakaoAccessToken = await userService.getKaKaoAccessToken(
    authCode,
    redirectUri
  );
  const { email } = await userService.getUserInformation(kakaoAccessToken);
  const { nickname, height, weight } = await req.body;

  if (!nickname || !height || !weight) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  await userService.addAdditionalInfo(email, nickname, height, weight);
  const token = await userService.createToken(email);
  await res.status(200).json({
    message: 'SIGN UP COMPLETED',
    authorization: token,
  });
});

const checkDuplicateNickname = catchAsync(async (req, res) => {
  const { nickname } = await req.body;
  const result = await userService.checkDuplicateNickname(nickname);

  result
    ? res.status(409).json({ message: 'DUPLICATED NICKNAME' })
    : res.status(200).json({
        message: 'AVAILABLE NICKNAME',
      });
});

module.exports = {
  kakaoSignIn,
  kakaoSignUp,
  checkDuplicateNickname,
};
