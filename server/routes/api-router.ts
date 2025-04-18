import express, { Router, Request, Response } from "express";

const apiRouter: Router = express.Router();


apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Eventure API Root");
});



export { apiRouter };