import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './passports';
import morgan from 'morgan';
import env from './env.json';
import { AppDataSource } from './db/data-source';
import TodoController from 'controllers/Todo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);
passportConfig();
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.save(() => {
      return res.redirect('/');
    });
  }
);

app.get('/', (req: Request, res: Response) => {
  console.log(req.user);
  console.log(req.session);
  res.send('server on !');
});

app.get('/todo', async (req, res) => {
  try {
    const todo = await TodoController.create({
      content: 'new',
      date: new Date(),
    });
    console.log(todo);
    res.send('done');
  } catch (e) {
    console.log(e);
    return res.send('error');
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log('DB connect success');
    app.listen(env.PORT, () => {
      console.log('server on port', env.PORT);
    });
  })
  .catch((e) => {
    console.log('DB connect error');
    console.log(e);
  });
