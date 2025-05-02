import { Request, Response, NextFunction, response } from "express";
import { getCitiesModel } from "../../models/extra-requests/get-cities";

export const getCitiesCtrl = (req: Request, res: Response, next: NextFunction) => {
    console.log("controller")
    getCitiesModel()
}