import { Request, Response, NextFunction, response } from "express";
import { deleteFavouritesById } from "../../models/join-table-models/delete-favourites";

export const deleteFavourites = (req: Request, res: Response, next: NextFunction) => {
    const {user_id, event_id} = req.params
    deleteFavouritesById(Number(user_id), Number(event_id)).then(() => {
        res.send(200).send()
    })
    .catch((err: any) => {
        next(err)
    })
}