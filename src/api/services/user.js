const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const { User } = require('../models');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const findOrCreateUser = async (userDto) => {
  const { name, email, password } = userDto;

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, email, password },
    });
    if (!created) {
      return setError(httpStatus.CONFLICT, '이미 사용중인 아이디입니다');
    }

    return user;
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

const findByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return setError(
        httpStatus.BAD_REQUEST,
        '아이디 혹은 비밀번호를 확인해주세요',
      );
    }

    return user;
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

module.exports = {
  findOrCreateUser,
  findByEmail,
};
