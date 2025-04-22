import { Request, Response, NextFunction, response } from "express";
import { deleteUserByUsername } from "../../models/users-models/delete-user";

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    deleteUserByUsername(username).then((response: string) => {
        if (response === "DELETE") {
            res.status(200).send()
        }
    })
    .catch((err: any) => {
        console.log(err)
    })
}