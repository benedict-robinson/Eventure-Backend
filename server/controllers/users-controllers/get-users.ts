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
        if (response.length === 0) {
            return Promise.reject({status: 404, msg: "User Not Found"})
        }
        res.status(200).send({user: response[0]})
    })
    .catch((err: {status: number, msg: string}) => {
        next(err)
      })
}

