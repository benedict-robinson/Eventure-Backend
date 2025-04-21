import express, { Router, Request, Response } from "express";
import { getUserByUsername, getUsers } from "../controllers/users-controllers/get-users";

const usersRouter: Router = express.Router();

usersRouter.get("/", getUsers)
usersRouter.get("/:username", getUserByUsername)

export { usersRouter }