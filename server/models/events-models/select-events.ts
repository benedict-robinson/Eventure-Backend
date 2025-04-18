const db = require("../../../db/connection.js")
import { EventInterface } from "../../../db/data/events"
import { getTicketmasterEvents } from "../../ticketmaster-requests/get-events-request"

export const selectEvents = () => {
    getTicketmasterEvents()
    return db.query("SELECT * FROM events")
    .then(({rows}: {rows: EventInterface[]}) => {
        return rows
    })
}