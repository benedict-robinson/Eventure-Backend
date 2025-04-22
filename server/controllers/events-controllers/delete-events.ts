import { Request, Response, NextFunction } from "express";
import { deleteEventById } from "../../models/events-models/delete-events";


export const deleteEvents = (req: Request, res: Response, next: NextFunction) => {
    const event_id = Number(req.params.event_id)
    const username = req.params.username
    if (!Number(event_id)) {
        return Promise.reject({status: 400, msg: "Bad Request - Invalid Event"})
    }
    deleteEventById(event_id, username).then((command: string) => {
        res.status(202).send()
    })
    .catch((err: any) => {
        next(err)
    })
}