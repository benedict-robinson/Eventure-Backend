import { Request, Response, NextFunction } from "express";
import { updateEvent } from "../../models/events-models/update-event";
import { EventInterface } from "../../../db/data/events";

export const patchEvents = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    const newEvent = req.body
    if (!newEvent.event_id) {
        return Promise.reject({status: 400, msg: "Bad Request - No Event Specified"})
    }
    updateEvent(username, newEvent).then((response: EventInterface) => {
        res.status(200).send({event: response})
    })
    .catch((err: any) => {
        next(err)
    })
}