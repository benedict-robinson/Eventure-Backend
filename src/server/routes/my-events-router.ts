import express, { Router } from "express";
import { getMyEvents } from "../controllers/join-table-controllers/get-my-events";

const myEventsRouter: Router = express.Router();

myEventsRouter.get("/:user_id", getMyEvents)

export { myEventsRouter }