import { Request, Response, NextFunction } from "express";
import { selectEvents } from "../../models/events-models/select-events"
import { EventInterface } from "../../../db/data/events";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
    selectEvents().then((events: EventInterface[]) => {
        res.status(200).send({ events });
    })
}