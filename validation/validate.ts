import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: string[] = [];
  errors.array({ onlyFirstError: true }).map((err) => {
    return extractedErrors.push(err.msg);
  });

  return res.status(422).json({
    message: extractedErrors,
  });
};

export default validate;
