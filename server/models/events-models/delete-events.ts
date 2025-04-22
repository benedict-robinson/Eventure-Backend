import { response } from "express";
import { UserInterface } from "../../../db/data/users";
import { EventInterface } from "../../../db/data/events";

const db = require("../../../db/connection.js");

export const deleteEventById = (eventId: number, username: string) => {
  return db
    .query("SELECT event_id FROM events")
    .then(({ rows }: { rows: { event_id: number }[] }) => {
      const filteredEvents = rows.filter((e) => e.event_id === eventId);
      if (filteredEvents.length === 0) {
        return Promise.reject({ status: 404, msg: "Event Not Found" });
      }
      return db.query("SELECT * FROM users WHERE username = $1", [username]);
    })
    .then(({ rows }: { rows: UserInterface[] }) => {
      const user = rows[0];

      if (!user.is_staff) {
        return Promise.reject({ status: 401, msg: "Unauthorized" });
      }
      return db.query(
        "SELECT event_id FROM user_my_events WHERE user_id = $1",
        [user.user_id]
      );
    })
    .then(({ rows }: { rows: { event_id: number }[] }) => {
      const ownedEvents = rows.filter((e) => e.event_id === eventId);
      if (ownedEvents.length === 0) {
        return Promise.reject({ status: 401, msg: "Unauthorized" });
      }
      return db.query("DELETE FROM events WHERE event_id = $1", [eventId]);
    })
    .then(({ command }: { command: string }) => {
      return command;
    });
};
