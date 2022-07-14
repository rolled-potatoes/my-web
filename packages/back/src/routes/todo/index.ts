import express from 'express';
import * as serviceTodo from 'services/todo';
import middlewarePassport from 'middlewares/passport';

const router = express.Router();

router.patch(
  '/:sequence',
  middlewarePassport.isLoggedIn,
  async (req, res, next) => {
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
  }
);

export default router;
