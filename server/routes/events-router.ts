import express, { Router, Request, Response } from "express";
import { getEvents } from "../controllers/events-controllers/get-events";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents)

export { eventsRouter };