import format from "pg-format";

const db = require("../../../db/connection.js");

export const insertFavourites = (newFave: {event_id: number, user_id: number}) => {
    return db.query("SELECT user_id FROM users WHERE user_id = $1", [newFave.user_id])
    .then(({rows}: {rows: {user_id: number}[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "User Not Found"})
        }
        const {event_id, user_id} = newFave
        const insertFavesQuery = format("INSERT INTO user_favourites (user_id, event_id) VALUES %L RETURNING *", [[user_id, event_id]]) 
        return db.query(insertFavesQuery)
    })
    .then(({rows}: {rows: {event_id: number, user_id: number}[]}) => {
        return rows[0]
    })
}