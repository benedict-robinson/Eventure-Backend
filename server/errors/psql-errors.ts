import { Request, Response, NextFunction } from 'express';

export const psqlErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err.code === "23505" || err.code === "42601") {
      res.status(400).send({ msg: "Bad Request" });
    } else next(err);
  };