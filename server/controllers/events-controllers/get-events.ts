import { Request, Response, NextFunction } from "express";
import { selectEvents } from "../../models/events-models/select-events";
import { EventInterface } from "../../../db/data/events";

export const getEvents = (req: Request, res: Response, next: NextFunction) => {
  const countryCodeRegex = /^[A-z]{2}$/
  const digitRegex = /\d/g
  const sortRegex = /\b(?:asc|desc)\b/
  const city = (req.query.city as string) || "";
  const countryCode = (req.query.countryCode as string) || ""
  const classificationName = (req.query.classificationName as string) || ""
  const sort = req.query.sort ? (req.query.sort as string).split("-") : []
  const errorOne = digitRegex.test([city, countryCode, classificationName].join(""))
  const errorTwo = countryCode && !countryCodeRegex.test(countryCode)
  let errorThree = false
  if (sort.length > 0) {
    errorThree = sort[0] !== "date" || !sortRegex.test(sort[1]) 
  }
  
  if (errorOne || errorTwo || errorThree) {
    return Promise.reject({status: 400, msg: "Bad Request"})
  }
  
  selectEvents(city, countryCode, classificationName).then((events: EventInterface[]) => {
    if (sort.length > 1) {
      const sortingEvents = [...events].map(e => {
        return {event: e, sortingDate: e.date_and_time ? new Date(e.date_and_time.start_date).getTime() : null}
      }).filter(e => e.sortingDate !== null)
      const sortedEvents = sortingEvents.sort((a, b) => a.sortingDate! - b.sortingDate!).map(e => e.event)
      if (sort[1] === "desc") {
        sortedEvents.reverse()
      }
      res.status(200).send({events: sortedEvents})
    }
    else {
      res.status(200).send({ events });
    }
  })
  .catch((err) => {
    next(err)
  })
};
