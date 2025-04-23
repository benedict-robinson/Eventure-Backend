import express, { Router } from "express";
import { getGoing } from "../controllers/join-table-controllers/get-going.ts";
import { postGoing } from "../controllers/join-table-controllers/post-going.ts";
import { deleteGoing } from "../controllers/join-table-controllers/delete-going.ts";

const goingRouter: Router = express.Router();

goingRouter.get("/:user_id", getGoing)
goingRouter.post("/:user_id", postGoing)
goingRouter.delete("/:user_id/event/:event_id", deleteGoing)

export { goingRouter }