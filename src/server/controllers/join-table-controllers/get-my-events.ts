import { Request, Response, NextFunction, response } from "express";
import { selectMyEvents } from "../../models/join-table-models/select-my-events";
import { EventInterface } from "../../../db/data/events";

export const getMyEvents = (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.user_id)
    if (!userId) {
        return Promise.reject({status: 400, msg: "Bad Request - Invalid User"})
    }
    selectMyEvents(userId).then((events: {events: EventInterface[]}) => {
        res.status(200).send({events: events})
    })
    .catch((err: any) => {
        next(err)
    })
}