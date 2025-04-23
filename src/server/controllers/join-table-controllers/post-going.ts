import { Request, Response, NextFunction, response } from "express";
import { insertGoing } from "../../models/join-table-models/insert-going";

export const postGoing = (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.user_id)
    const newGoing = req.body
    if (!userId) {
        return Promise.reject({status: 400, msg: "Bad Request - Invalid User"})
    }
    if (newGoing.user_id !== userId) {
        return Promise.reject({status: 401, msg: "Unauthorized"})
    }
    insertGoing(newGoing).then((response: {event_id: number, user_id: number}) => {
        res.status(201).send({favourite: response})
    })
    .catch((err: any) => {
        console.log(err)
        next(err)
    })
}