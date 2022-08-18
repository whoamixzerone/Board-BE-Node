const jwt = require('jsonwebtoken');

const generateAuthToken = async (user) => {
  const { id, name } = user;
  try {
    const token = await jwt.sign(
      { userId: id, userName: name },
      process.env.AUTH_ACCESSKEY_TOKEN,
      {
        algorithm: process.env.AUTH_ALGORITHM_TOKEN,
        expiresIn: process.env.AUTH_EXPIRESIN_TOKEN,
      },
    );

    return { accessToken: token };
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
};

module.exports = {
  generateAuthToken,
};
