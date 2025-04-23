import { EventInterface } from "../../../db/data/events"

const db = require("../../../db/connection.js")

export const selectEventById = (eventId: number) => {
    return db.query("SELECT * FROM events WHERE event_id = $1", [eventId])
    .then(({rows}: {rows: EventInterface[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Event Not Found"})
        }
        return rows[0].event_id === eventId ? {event: rows[0]} : ""
    })
}