import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import Password from '../utils/password';
import jwt from 'jsonwebtoken';

export class UserController {
  static async signUp(req: Request, res: Response) {
    const { name, password, is_admin } = req.body;

    const userCreated = await User.create({
      name,
      password,
      is_admin,
    });

    return res.status(201).json({
      error: false,
      data: userCreated,
      message: 'Successfully registered',
    });
  }

  static async signIn(req: Request, res: Response) {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ where: { name } });
    if (!existingUser) throw new BadRequestError('User not found');

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) throw new BadRequestError('User not found');

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        is_admin: existingUser.is_admin,
      },
      process.env.JWT_KEY!
    );

    return res.status(200).json({
      error: false,
      token: userJwt,
      message: 'successfully sign in',
    });
  }
}
