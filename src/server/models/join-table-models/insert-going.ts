import format from "pg-format";

const db = require("../../../db/connection");

export const insertGoing = (newGoing: {event_id: number, user_id: number}) => {
    return db.query("SELECT user_id FROM users WHERE user_id = $1", [newGoing.user_id])
    .then(({rows}: {rows: {user_id: number}[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "User Not Found"})
        }
        const {event_id, user_id} = newGoing
        const insertGoingsQuery = format("INSERT INTO user_going (user_id, event_id) VALUES %L RETURNING *", [[user_id, event_id]]) 
        return db.query(insertGoingsQuery)
    })
    .then(({rows}: {rows: {event_id: number, user_id: number}[]}) => {
        return rows[0]
    })
}