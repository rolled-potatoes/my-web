import express, { Request, Response, NextFunction } from 'express';
import serviceTodo from 'services/todo';
import todoController from 'controllers/Todo';
import middlewarePassport from 'middlewares/passport';
import { Todo } from 'entities/Todo';
import { User } from 'entities/User';

const router = express.Router();

router.use('*', middlewarePassport.isLoggedIn, middlewarePassport.isMaster);
router.post('', async (req: Request, res: Response, next: NextFunction) => {
  let { content, date } = req.body;
  if (!content) content = '';
  if (!date) date = new Date();

  let result: Todo;

  try {
    result = await todoController.create({
      content,
      date,
      user: req.user as User,
    });
  } catch (e) {
    next({
      status: 500,
      message: 'create todo error',
      error: e,
    });
  }

  res.json({
    todo: result,
  });
});

router.patch('/:sequence', async (req, res, next) => {
  const { sequence } = req.params;

  if (sequence === undefined) {
    next({
      status: 400,
      message: 'not find sequence',
    });
    return;
  }

  try {
    await serviceTodo.patchOne({
      sequence: +sequence,
      content: req.body.content,
      isDone: req.body.isDone,
      date: req.body.date,
    });
  } catch (e) {
    next({
      status: 500,
      message: 'todo service error',
      error: e,
    });
  }

  res.json({
    success: true,
  });
});

export default router;
