import { Request, Response, NextFunction } from "express";
import { insertEvent } from "../../models/events-models/insert-event";


export const postEvent = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params
    const newEvent = req.body 
    if (!newEvent.tags || !newEvent.name || !newEvent.description) {
        return Promise.reject({status: 400, msg: "Bad Request - More Information Required"})
    }
    insertEvent(username, newEvent).then(({rows}: {rows: {user_id: number, event_id: number}[]}) => {
        console.log(rows)
        const [response] = rows
        res.status(201).send(response)
    })
    .catch((err: any) => {
        next(err)
    })
}