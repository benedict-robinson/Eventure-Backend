const db = require("../../../db/connection");
import { selectUserByUsername } from "../users-models/select-users";
import { UserInterface } from "../../../db/data/users";
import format from "pg-format";
import { EventInterface } from "../../../db/data/events";

export const updateEvent = (username: string, newEvent: any) => {
  return selectUserByUsername(username).then(([response]: [response: UserInterface]) => {
      if (!response) {
        return Promise.reject({ status: 404, msg: "User Not Found" });
      }
      const { user_id, is_staff } = response;
      if (!is_staff) {
        return Promise.reject({ status: 401, msg: "Unauthorized" });
      }
      return db.query("SELECT event_id FROM user_my_events WHERE user_id = $1", [user_id])
    })
    .then(({rows}: {rows: {event_id: number}[]}) => {
        const authorization = rows.map(e => e.event_id).includes(newEvent.event_id)
        if (!authorization) {
            return Promise.reject({ status: 401, msg: "Unauthorized" })
        }
        const possibleKeys = [
            "api_event_id",
            "name",
            "location",
            "date_and_time",
            "tags",
            "img",
            "info",
            "description",
            "url"
          ]
      const formattedUpdates = Object.entries(newEvent)
      .flatMap(([key, value]) => {
            if (!possibleKeys.includes(key)) {
                return []
            }
          return key === "event_id" ? [] : [format("%I = %L", key, value)]
      }
      )
      .join(", ");
      const updateQuery = format(
        `UPDATE events SET %s WHERE event_id = %L RETURNING *;`,
        formattedUpdates,
        newEvent.event_id
      );
      return db.query(updateQuery)
  })
  .then(({rows}: {rows: EventInterface[]}) => {
    return rows[0]
  })
};
