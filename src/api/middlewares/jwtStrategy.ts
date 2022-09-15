// import * as httpStatus from 'http-status';
// import * as passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
// import User from '../entities/User';

// const opts: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.AUTH_ACCESSKEY_TOKEN,
// };

// export default () => {
//   passport.use(
//     new JwtStrategy(opts, async (payload, done) => {
//       try {
//         const user = await User.findByPk(payload.userId);
//         if (user) {
//           return done(null, user);
//         }

//         return done(null, false, {
//           status: httpStatus.UNAUTHORIZED,
//           message: '유효하지 않은 토큰입니다',
//         });
//       } catch (err: any) {
//         console.error('JwtStrategy >>> ', err);
//         if (err.name === 'TokenExpiredError') {
//           return done(null, false, {
//             status: httpStatus.FORBIDDEN,
//             message: '토큰이 만료됐습니다',
//           });
//         }

//         return done(err, false);
//       }
//     }),
//   );
// };
