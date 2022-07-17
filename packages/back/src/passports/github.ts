import { Strategy } from 'passport-github2';
import UserController from 'controllers/User';
import env from 'src/env.json';

interface I_GithubUser {
  id: string;
  username: string;
  photos: [
    {
      value: string;
    }
  ];
}

interface I_GithubAuth {
  strategy: any;
  callback(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ): void;
}

class GithubAuth implements I_GithubAuth {
  strategy: any;

  constructor() {
    this.strategy = new Strategy(
      {
        clientID: env.GITHUB_CLIENT_KEY,
        clientSecret: env.GITHUB_CLIENT_SECRET_KET,
        callbackURL: 'http://localhost:8080/api/auth/github/callback',
      },
      this.callback
    );
  }

  async callback(
    accessToken: string,
    refreshToken: string,
    profile: I_GithubUser,
    done: any
  ) {
    const user = await UserController.findOneById(profile.id);

    if (user) {
      return done(null, user);
    } else {
      const newUser = await UserController.createUser({
        id: profile.id,
        name: profile.username,
        profile: profile.photos[0].value,
      });

      return done(null, newUser);
    }
  }
}

export default new GithubAuth();
