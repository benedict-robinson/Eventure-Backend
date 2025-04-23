import { Request, Response, NextFunction } from 'express';

export const serverErrorHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send({ msg: "Internal server error!" });
  };