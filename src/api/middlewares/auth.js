const passport = require('passport');

const setError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const isAuthVerify = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      return next(setError(info.status, info.message));
    }

    req.user = { userId: user.id, userName: user.name };
    next();
  })(req, res, next);
};

module.exports = {
  isAuthVerify,
};
