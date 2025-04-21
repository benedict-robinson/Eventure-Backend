import { Request, Response, NextFunction } from "express";
import { selectEvents } from "../../models/events-models/select-events";
import { EventInterface } from "../../../db/data/events";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const countryCodeRegex = /^[A-z]{2}$/
  const digitRegex = /\d/g
  const city = (req.query.city as string) || "";
  const countryCode = (req.query.countryCode as string) || ""
  const classificationName = (req.query.classificationName as string) || ""
  const error = digitRegex.test([city, countryCode, classificationName].join(""))
  
  if (error || !countryCodeRegex.test(countryCode)) {
    return Promise.reject({status: 400, msg: "Bad Request"})
  }

  selectEvents(city, countryCode, classificationName).then((events: EventInterface[]) => {
    res.status(200).send({ events });
  })
  .catch((err) => {
    next(err)
  })
};
