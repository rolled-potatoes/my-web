import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('server on !');
});

app.listen(8080, () => {
  console.log('server on port',8080);
});
