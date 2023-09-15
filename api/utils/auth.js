const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      const error = new Error('NEED_ACCESS_TOKEN');
      error.statusCode = 401;
      return res.status(error.statusCode).json({ message: error.message });
    }

    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userService.getUserByEmail(payload['email']);
    const userType = await payload.userType;
    const grade = await payload.grade;

    if (!user) {
      const error = new Error('USER_DOES_NOT_EXIST');
      error.statusCode = 404;
      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user;
    res.locals.userType = userType;
    res.locals.grade = grade;
    next();
  } catch {
    const error = new Error('INVALID_ACCESS_TOKEN');
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { loginRequired };
