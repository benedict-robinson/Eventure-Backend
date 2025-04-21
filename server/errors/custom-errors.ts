import { Request, Response, NextFunction } from 'express';

export const customErrorHandler = (
  err: { status?: number; msg?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};