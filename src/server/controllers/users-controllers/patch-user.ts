import { Request, Response, NextFunction, response } from "express";
import { updateUser } from "../../models/users-models/update-user";
import { UserInterface } from "../../../db/data/users";

export const patchUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const { username } = req.params
    updateUser(username, newUser).then((response: UserInterface) => {
        res.status(200).send({user: response})
    })
    .catch((err: any) => {
        next(err)
    })
}