import format from "pg-format";
import { UserInterface } from "../../../db/data/users";
import { selectUserByUsername } from "./select-users";

const db = require("../../../db/connection");

export const updateUser = (username: string, newUser: any) => {
  return selectUserByUsername(username).then(
    ([response]: [response: UserInterface]) => {
      if (!response) {
        return Promise.reject({ status: 404, msg: "User Not Found" });
      }
      const possibleKeys = ["username", "email", "is_staff", "image_url"];
      const formattedUpdates = Object.entries(newUser)
        .flatMap(([key, value]) => {
          if (!possibleKeys.includes(key)) {
            return [];
          }
          return key === "user_id" ? [] : [format("%I = %L", key, value)];
        })
        .join(", ");
        const updateQuery = format(
            `UPDATE users SET %s WHERE username = %L RETURNING *;`,
            formattedUpdates,
            username
          );
          return db.query(updateQuery)
    })
    .then(({rows}: {rows: UserInterface[]}) => {
        return rows[0]
      })
};
