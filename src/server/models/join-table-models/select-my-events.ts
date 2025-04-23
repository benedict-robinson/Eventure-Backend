import format from "pg-format";
import { EventInterface } from "../../../db/data/events";

const db = require("../../../db/connection.js");


export const selectMyEvents = (userId: number) => {
    return db.query("SELECT is_staff FROM users WHERE user_id = $1", [userId])
    .then(({rows}: {rows: {is_staff: boolean}[]}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "User Not Found"})
        }
        if (!rows[0].is_staff) {
            return Promise.reject({status: 401, msg: "Unauthorized"})
        }
        return db
        .query("SELECT event_id FROM user_my_events WHERE user_id = $1", [userId])
    })
    .then(({ rows }: { rows: { event_id: number }[] }) => {
      const ids = rows.map((e) => e.event_id);
      const selectQuery = format(
        "SELECT * FROM events WHERE event_id IN (%s)",
        [ids.map((id) => format("%L", id)).join(", ")]
      );
      return db.query(selectQuery)
    })
    .then(({rows}: {rows: EventInterface[]}) => {
        return rows
    })
}