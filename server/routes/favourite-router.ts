import express, { Router } from "express";
import { getFavourites } from "../controllers/join-table-controllers/get-favourites";

const favouritesRouter: Router = express.Router();

favouritesRouter.get("/:user_id", getFavourites)

export { favouritesRouter }