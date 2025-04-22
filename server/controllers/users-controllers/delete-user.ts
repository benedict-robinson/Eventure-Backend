import { Request, Response, NextFunction, response } from "express";
import { deleteUserByUsername } from "../../models/users-models/delete-user";
import { UserInterface } from "../../../db/data/users";

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    deleteUserByUsername(username).then((response: UserInterface) => {
        if (response.username === username) {
            res.status(200).send()
        }
    })
    .catch((err: any) => {
        next(err)
    })
}