import express, { Router } from "express";
import { getFavourites } from "../controllers/join-table-controllers/get-favourites";
import { postFavourites } from "../controllers/join-table-controllers/post-favourites";

const favouritesRouter: Router = express.Router();

favouritesRouter.get("/:user_id", getFavourites)
favouritesRouter.post("/:user_id", postFavourites)

export { favouritesRouter }