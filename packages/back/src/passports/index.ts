import passport from 'passport';
import UserContoller from 'controllers/User';
import { User } from 'entities/User';
import github from './github';

passport.use(github.strategy);

export default () => {
  passport.serializeUser(function (user: User, done) {
    return done(null, user.sequence);
  });

  passport.deserializeUser(async function (sequence: number, done) {
    const user = await UserContoller.findOneBySequence(sequence);
    return done(null, user);
  });
};
