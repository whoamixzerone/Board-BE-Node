const httpStatus = require('http-status');
const userService = require('../services/user');
const bcryptUtils = require('../utils/bcrypt');
const tokenUtils = require('../utils/token');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const signup = async (req, res, next) => {
  let userDto = {
    ...req.body,
  };

  try {
    const hashPasswd = await bcryptUtils.passwordToHash(userDto.password);
    userDto.password = hashPasswd;

    const user = await userService.findOrCreateUser(userDto);
    if (user instanceof Error) {
      return next(user);
    }

    return res.status(httpStatus.CREATED).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findByEmail(email);
    if (!(await bcryptUtils.isComparePassword(user, password))) {
      return next(
        setError(httpStatus.BAD_REQUEST, '아이디 혹은 비밀번호를 확인해주세요'),
      );
    }
    const token = await tokenUtils.generateAuthToken(user);
    if (token instanceof Error) {
      return next(token);
    }

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const reissue = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userService.findByEmail(email);
    const token = await tokenUtils.generateAuthToken(user);
    if (token instanceof Error) {
      return next(token);
    }

    return res.status(httpStatus.OK).json(token);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  signup,
  signin,
  reissue,
};
