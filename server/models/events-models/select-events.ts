const db = require("../../../db/connection.js")
import { EventInterface } from "../../../db/data/events"
import { getTicketmasterEvents } from "../../ticketmaster-requests/get-events-request"
import { formatArray } from "../../../utils"
import format from "pg-format"

export const selectEvents = () => {
    return getTicketmasterEvents().then((response) => {
        const formattedEvents = response.map(({
            api_event_id,
            name,
            location,
            date_and_time,
            tags,
            img,
            info,
            description,
            url,
          }: EventInterface) => [
            api_event_id,
            name,
            location || {location: "No Location Provided"},
            date_and_time,
            formatArray(tags),
            img,
            info,
            description,
            url,
          ])
        const insertEventsQuery = format(
            `INSERT INTO events (api_event_id, name, location, date_and_time, tags, img, info, description, url) 
            VALUES %L
            ON CONFLICT (api_event_id) DO NOTHING;`,
            formattedEvents
        )
        return db.query(insertEventsQuery)
        .then(() => {
            return db.query("SELECT * FROM events")
            .then(({rows}: {rows: EventInterface[]}) => {
                return rows
            })
        })
    })
}