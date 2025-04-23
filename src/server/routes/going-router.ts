import express, { Router } from "express";
import { getGoing } from "../controllers/join-table-controllers/get-going";
import { postGoing } from "../controllers/join-table-controllers/post-going";
import { deleteGoing } from "../controllers/join-table-controllers/delete-going";

const goingRouter: Router = express.Router();

goingRouter.get("/:user_id", getGoing)
goingRouter.post("/:user_id", postGoing)
goingRouter.delete("/:user_id/event/:event_id", deleteGoing)

export { goingRouter }