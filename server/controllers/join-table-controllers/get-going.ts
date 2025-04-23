import { Request, Response, NextFunction, response } from "express";
import { selectGoingByUser } from "../../models/join-table-models/select-going";
import { EventInterface } from "../../../db/data/events";

export const getGoing = (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.user_id)
    if (!userId) {
        return Promise.reject({status: 400, msg: "Bad Request - Invalid User"})
    }
    selectGoingByUser(userId).then((events: EventInterface[]) => {
        console.log(events)
        if (events.length === 0) {
            res.status(200).send({msg: "No Events Marked 'Going'"})
        }
        res.status(200).send({events: events})
    })
    .catch((err: any) => {
        console.log(err)
        next(err)
    })
}