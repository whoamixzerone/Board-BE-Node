const bcrypt = require('bcrypt');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const passwordToHash = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

const isComparePassword = async (user, password) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    console.error(err);
    return setError(err);
  }
};

module.exports = {
  passwordToHash,
  isComparePassword,
};
