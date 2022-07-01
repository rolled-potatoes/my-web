import express, { Request, Response } from 'express';
import env from '../env.json';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('server on !');
});

app.listen(env.PORT, () => {
  console.log('server on port', env.PORT);
});
