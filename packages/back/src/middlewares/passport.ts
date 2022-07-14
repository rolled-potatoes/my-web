import { Request, Response, NextFunction } from 'express';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) next();
  else {
    next({
      status: 403,
      message: 'need login',
    });
  }
}

export default {
  isLoggedIn,
};
