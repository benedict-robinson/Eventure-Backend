import express, { Router, Request, Response } from "express";
import { getUserByUsername, getUsers } from "../controllers/users-controllers/get-users";
import { postUser } from "../controllers/users-controllers/post-user";

const usersRouter: Router = express.Router();

usersRouter.get("/", getUsers)
usersRouter.get("/:username", getUserByUsername)
usersRouter.post("/", postUser)

export { usersRouter }