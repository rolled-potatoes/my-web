import express from 'express';
import githubRouter from './github';

const router = express.Router();

router.use('/github', githubRouter);

router.get('/check', (req, res) => {
  return res.json(req.user);
});

export default router;
