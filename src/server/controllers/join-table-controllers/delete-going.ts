import { Request, Response, NextFunction, response } from "express";
import { deleteGoingById } from "../../models/join-table-models/delete-going";

export const deleteGoing = (req: Request, res: Response, next: NextFunction) => {
    const {user_id, event_id} = req.params
    deleteGoingById(Number(user_id), Number(event_id)).then(() => {
        res.send(200).send()
    })
    .catch((err: any) => {
        next(err)
    })
}