import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const verifyAuthToken = (req: Request) => {
  let token = req.headers.authorization;

  if (!token) throw new NotAuthorizedError('Auth token required');

  token = token.split(' ')[1];

  try {
    const credentials = jwt.verify(token, process.env.JWT_KEY!);
    return credentials;
  } catch (error) {
    throw new NotAuthorizedError('Invalid token');
  }
};
