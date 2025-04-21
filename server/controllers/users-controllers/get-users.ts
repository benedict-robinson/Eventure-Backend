import { Request, Response, NextFunction, response } from "express";
import { selectUsers, selectUserByUsername } from "../../models/users-models/select-users";
import { UserInterface } from "../../../db/data/users";

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    selectUsers().then((response: UserInterface[]) => {
        res.status(200).send({users: response})
    })
}
export const getUserByUsername = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    selectUserByUsername(username).then((response: UserInterface[]) => {
        res.status(200).send({user: response[0]})
    })
}

