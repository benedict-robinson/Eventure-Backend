import { Request, Response, NextFunction } from 'express';

export const psqlErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = ["23505", "42601", "23502", "22P02"]
    if (errors.includes(err.code)) {
      res.status(400).send({ msg: "Bad Request" });
    } else next(err);
  };