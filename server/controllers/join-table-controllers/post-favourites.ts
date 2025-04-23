import { Request, Response, NextFunction, response } from "express";
import { insertFavourites } from "../../models/join-table-models/insert-favourites";

export const postFavourites = (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.user_id)
    const newFave = req.body
    if (!userId) {
        return Promise.reject({status: 400, msg: "Bad Request - Invalid User"})
    }
    if (newFave.user_id !== userId) {
        return Promise.reject({status: 401, msg: "Unauthorized"})
    }
    insertFavourites(newFave).then((response: {event_id: number, user_id: number}) => {
        res.status(201).send({favourite: response})
    })
    .catch((err: any) => {
        console.log(err)
        next(err)
    })
}