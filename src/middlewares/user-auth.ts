import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { verifyAuthToken } from '../utils/verify-auth-token';

interface UserPayload {
  id: number;
  name: string;
  is_admin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      auth?: UserPayload;
    }
  }
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = verifyAuthToken(req) as UserPayload;
  req.auth = token;

  next();
};
