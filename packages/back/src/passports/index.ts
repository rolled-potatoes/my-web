import passport from 'passport';
import UserContoller from 'controllers/User';
import github from './github';

passport.use(github.strategy);

interface I_GithubUser {
  sequence: number;
  id: string;
  username: string;
  photos: {
    value: string;
  };
}

export default () => {
  passport.serializeUser(function (user: I_GithubUser, done) {
    return done(null, user.sequence);
  });

  passport.deserializeUser(async function (sequence: number, done) {
    const user = await UserContoller.findOneBySequence(sequence);
    return done(null, user);
  });
};
