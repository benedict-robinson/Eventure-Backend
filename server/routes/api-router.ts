import express, { Router, Request, Response } from "express";
import { eventsRouter } from "./events-router";
import { inputErrorHandler } from "../errors/input-error";

const apiRouter: Router = express.Router();


apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Eventure API Root");
});

apiRouter.use("/events", eventsRouter)



export { apiRouter };