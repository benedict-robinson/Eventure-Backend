import { Request, Response, NextFunction, response } from "express";
import { selectEventById } from "../../models/events-models/select-by-id";
import { EventInterface } from "../../../db/data/events";

export const getEventById = (req: Request, res: Response, next: NextFunction) => {
    const eventId = Number(req.params.event_id)
    if (!eventId) {
        return Promise.reject({status: 400, msg: "Bad Request"})
    }
    selectEventById(eventId).then(({event}: {event: EventInterface}) => {
        res.status(200).send({event: event})
    })
    .catch((err: any) => {
        next(err)
    })
}