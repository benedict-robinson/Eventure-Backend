import { Request, Response, NextFunction } from "express";
import { insertEvent } from "../../models/events-models/insert-event";


export const postEvent = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params 
    console.log(user_id)
    insertEvent()
}