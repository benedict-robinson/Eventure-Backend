const db = require("../../../db/connection.js");

export const deleteEventById = (eventId: number) => {
    return db.query("DELETE FROM events WHERE event_id = $1", [eventId])
    .then(({command}: {command: string}) => {
        return command
    })
}