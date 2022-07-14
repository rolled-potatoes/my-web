import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

import passportConfig from './passports';
import env from './env.json';
import { AppDataSource } from './db/data-source';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_KEY,
    resave: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
  })
);

passportConfig();
app.use(passport.session());
app.use(passport.initialize());
app.use(morgan('dev'));

app.use('/api', routes);

app.use((req: Request, res: Response) => {
  res.status(404).send('not found');
});

interface I_ErrorRequest extends ErrorRequestHandler {
  status?: number;
  message?: string;
  error: any;
}

app.use(
  (error: I_ErrorRequest, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const responseStatus = error.status ?? 500;
    const responseMessage =
      responseStatus >= 500 ? 'internal error' : error.message ?? 'error';

    res.status(responseStatus).send(responseMessage);
  }
);

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
