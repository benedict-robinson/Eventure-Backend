import format from "pg-format";
import { EventInterface } from "../../../db/data/events";
const db = require("../../../db/connection.js");

export const selectGoingByUser = (id: number) => {
    return db
    .query("SELECT event_id FROM user_going WHERE user_id = $1", [id])
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
};