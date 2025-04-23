import express, { Router, Request, Response } from "express";
import { eventsRouter } from "./events-router";
import { inputErrorHandler } from "../errors/input-error";
import { usersRouter } from "./users-router";
import { favouritesRouter } from "./favourite-router";
import { goingRouter } from "./going-router";
import { myEventsRouter } from "./my-events-router";

const apiRouter: Router = express.Router();


apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Eventure API Root");
});

apiRouter.use("/events", eventsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/favourites", favouritesRouter)
apiRouter.use("/going", goingRouter)
apiRouter.use("/my-events", myEventsRouter)



export { apiRouter };