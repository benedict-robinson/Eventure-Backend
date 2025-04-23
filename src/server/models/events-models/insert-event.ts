import format from "pg-format";
import { EventInterface } from "../../../db/data/events";
import { UserInterface } from "../../../db/data/users";
import { selectUserByUsername } from "../users-models/select-users";
import { formatArray } from "../../../utils";

const db = require("../../../db/connection");

export const insertEvent = (username: string, newEvent: EventInterface) => {
  return selectUserByUsername(username).then(
    ([response]: [response: UserInterface]) => {
    if (!response) {
        return Promise.reject({status: 404, msg: "User Not Found"})
    }
      const {user_id, is_staff} = response
      const {
        api_event_id,
        name,
        location,
        date_and_time,
        tags,
        img,
        info,
        description,
        url,
      } = newEvent;
      if (!is_staff) {
        return Promise.reject({ status: 401, msg: "Unauthorized" });
      }
      const insertQuery = format(
        "INSERT INTO events (api_event_id, name, location, date_and_time, tags, img, info, description, url) VALUES %L RETURNING event_id;",
        [
          [
            api_event_id,
            name,
            location,
            date_and_time,
            formatArray(tags),
            img,
            info,
            description,
            url,
          ],
        ]
      );
      return Promise.all([db.query(insertQuery), user_id])
    })
    .then((response: any)=> {
        const eventId = response[0].rows[0].event_id
        const userId = response[1]
        return db.query("INSERT INTO user_my_events (user_id, event_id) VALUES ($1, $2) RETURNING *", [userId, eventId])
    })
};
