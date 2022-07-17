import { Request, Response, NextFunction } from 'express';
import { User } from 'entities/User';
import { UserRole } from 'src/db/entities/enum';

function isMaster(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User;
  if (user && user.level === UserRole.ADMIN) {
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
