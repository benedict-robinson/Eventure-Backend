import { Request, Response, NextFunction } from "express";
import { insertEvent } from "../../models/events-models/insert-event";


export const postEvent = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    const newEvent = req.body 
    insertEvent(username, newEvent).then(({rows}) => {
        const [response] = rows
        res.status(201).send(response)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}