import express from 'express';
import authRouter from './auth';
import todoRouter from './todo';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/todo', todoRouter);

export default router;
