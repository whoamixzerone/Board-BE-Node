const httpStatus = require('http-status');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_ACCESSKEY_TOKEN;

module.exports = () => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findByPk(payload.userId);
        if (user) {
          return done(null, user);
        }

        return done(null, false, {
          status: httpStatus.UNAUTHORIZED,
          message: '유효하지 않은 토큰입니다',
        });
      } catch (err) {
        console.error('JwtStrategy >>> ', err);
        if (err.name === 'TokenExpiredError') {
          return done(null, false, {
            status: httpStatus.FORBIDDEN,
            message: '토큰이 만료됐습니다',
          });
        }

        return done(err, false);
      }
    }),
  );
};
