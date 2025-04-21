import express, { Router, Request, Response } from "express";
import { getEvents } from "../controllers/events-controllers/get-events";
import { postEvent } from "../controllers/events-controllers/post-events";
import { patchEvents } from "../controllers/events-controllers/patch-event";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents)
eventsRouter.post("/:username", postEvent)
eventsRouter.patch("/:username", patchEvents)

export { eventsRouter };