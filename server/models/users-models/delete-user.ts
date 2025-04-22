import { response } from "express"

const db = require("../../../db/connection.js")

export const deleteUserByUsername = (username: string) => {
    return db.query("DELETE FROM users WHERE username = $1", [username])
    .then(({command}: {command: string}) => {
        return command
    })
}