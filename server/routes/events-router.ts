import express, { Router, Request, Response } from "express";
import { getEvents } from "../controllers/events-controllers/get-events";
import { postEvent } from "../controllers/events-controllers/post-events";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents)
eventsRouter.post("/:user_id", postEvent)

export { eventsRouter };