import express, { Router } from "express";
import { getFavourites } from "../controllers/join-table-controllers/get-favourites";
import { postFavourites } from "../controllers/join-table-controllers/post-favourites";
import { deleteFavourites } from "../controllers/join-table-controllers/delete-favourites";

const favouritesRouter: Router = express.Router();

favouritesRouter.get("/:user_id", getFavourites)
favouritesRouter.post("/:user_id", postFavourites)
favouritesRouter.delete("/:user_id/event/:event_id", deleteFavourites)

export { favouritesRouter }