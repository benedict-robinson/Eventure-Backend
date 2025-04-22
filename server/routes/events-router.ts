import express, { Router, Request, Response } from "express";
import { getEvents } from "../controllers/events-controllers/get-events";
import { postEvent } from "../controllers/events-controllers/post-events";
import { patchEvents } from "../controllers/events-controllers/patch-event";
import { deleteEvents } from "../controllers/events-controllers/delete-events";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents)
eventsRouter.post("/:username", postEvent)
eventsRouter.patch("/:username/event/:event_id", patchEvents)
eventsRouter.delete("/:username/event/:event_id", deleteEvents)

export { eventsRouter };