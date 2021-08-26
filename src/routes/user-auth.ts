import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import Rules from "../validation/rules";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(Rules.auth),
  async (req: Request, res: Response) => {
    const { name, password, is_admin } = req.body;

    const userCreated = await User.create({
      name,
      password,
      is_admin,
    });

    return res.status(201).json({
      error: false,
      data: userCreated,
      message: "Successfully registered",
    });
  }
);

export { router as UserAuthRouter };
