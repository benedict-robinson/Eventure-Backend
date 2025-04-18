import { Request, Response, NextFunction } from "express";
import { selectEvents } from "../../models/events-models/select-events";
import { EventInterface } from "../../../db/data/events";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const city = (req.query.city as string) || "";

  selectEvents(city).then((events: EventInterface[]) => {
    res.status(200).send({ events });
  });
};
