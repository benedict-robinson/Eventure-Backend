import { Request, Response, NextFunction } from 'express';

export const inputErrorHandler = (
    err: { status?: number; msg?: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("here")
    res.status(400).send({ msg: "Invalid input" });
    next(err);
  };