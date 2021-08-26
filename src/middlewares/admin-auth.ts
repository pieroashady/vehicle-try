import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.is_admin) {
    throw new NotAuthorizedError('Not auhorized');
  }

  next();
};
