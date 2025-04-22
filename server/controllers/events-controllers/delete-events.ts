import { Request, Response, NextFunction } from "express";
import { deleteEventById } from "../../models/events-models/delete-events";


export const deleteEvents = (req: Request, res: Response, next: NextFunction) => {
    const event_id = Number(req.params.event_id)
    deleteEventById(event_id).then((command: string) => {
        res.status(202).send()
    })
    .catch((err: any) => {
        console.log(err)
        next(err)
    })
}