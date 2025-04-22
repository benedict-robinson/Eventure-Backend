import { response } from "express"
import { UserInterface } from "../../../db/data/users"

const db = require("../../../db/connection.js")

export const deleteUserByUsername = (username: string) => {
    return db.query("DELETE FROM users WHERE username = $1 RETURNING *", [username])
    .then(({rows}: {rows: UserInterface[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "User Not Found"})
        }
        return rows[0]
    })
}