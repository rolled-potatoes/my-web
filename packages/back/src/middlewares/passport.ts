import { Request, Response, NextFunction } from 'express';
import { UserRole } from 'src/db/entities/enum';

function isMaster(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.level === UserRole.ADMIN) {
    next();
    return;
  } else {
    next({
      status: 403,
      message: 'not master',
    });
  }
}

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
  isMaster,
};
