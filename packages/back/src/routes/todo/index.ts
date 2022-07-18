import express, { Request, Response, NextFunction } from 'express';
import serviceTodo from 'services/todo';
import todoController from 'controllers/Todo';
import middlewarePassport from 'middlewares/passport';
import { Todo } from 'entities/Todo';
import { User } from 'entities/User';
import { isDate, string2boolean } from 'utils/typeCheck';

const router = express.Router();

interface I_GetTodoListQuery {
  isDone?: string;
  start?: string;
  end?: string;
}

router.use('*', middlewarePassport.isLoggedIn, middlewarePassport.isMaster);

router.get(
  '',
  async (
    //RequestHandler<Params, ResBody, ReqBody, ReqQuery>
    req: Request<unknown, unknown, unknown, I_GetTodoListQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { isDone, start, end } = req.query;

    try {
      const result = await todoController.find({
        options: {
          isDone: isDone ? string2boolean(isDone) : null,
          start: isDate(start) ? new Date(start) : null,
          end: isDate(end) ? new Date(end) : null,
        },
      });

      res.json({
        todos: result,
      });
    } catch (e) {
      next({
        status: 500,
        message: 'get todo list error',
        error: e,
      });
    }
  }
);

router.get(
  '/:sequence',
  async (req: Request, res: Response, next: NextFunction) => {
    const { sequence } = req.params;
    try {
      const result = await todoController.findOne(+sequence);
      res.json({
        todo: result,
      });
    } catch (e) {
      next({
        status: 500,
        message: 'get todo error',
        error: e,
      });
    }
  }
);

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
