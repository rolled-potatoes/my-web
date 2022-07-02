import express, { Request, Response } from 'express';
import env from '../env.json';
import { AppDataSource } from './data-source';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('server on !');
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
