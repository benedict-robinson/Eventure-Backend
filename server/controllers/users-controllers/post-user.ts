import { Request, Response, NextFunction, response } from "express";
import { insertUser } from "../../models/users-models/insert-user";
import { UserInterface } from "../../../db/data/users";

export const postUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    insertUser(newUser).then((response: UserInterface) => {
        res.status(201).send({user: response})
    })
    .catch((err: any) => {
        console.log(err)
        next(err)
    })
}