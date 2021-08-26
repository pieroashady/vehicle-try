import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import { RequestValidationError } from "../errors/request-validation-error";

export function validateRequest(rules: Validator.Rules) {
  return function (req: Request, res: Response, next: NextFunction) {
    const mergeRequest = { ...req.body, ...req.params, ...req.query };

    const validation = new Validator(mergeRequest, rules);

    if (validation.fails()) {
      throw new RequestValidationError(validation.errors.all());
    }

    next();
  };
}
