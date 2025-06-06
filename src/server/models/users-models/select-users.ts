const db = require("../../../db/connection");
import { UserInterface } from "../../../db/data/users";

export const selectUsers = () => {
  return db
    .query("SELECT * FROM users")
    .then(({ rows }: { rows: UserInterface[] }) => {
      return rows;
    });
};

export const selectUserByUsername = (username: string) => {
    return db.query("SELECT * FROM users WHERE username = $1", [username])
    .then(({rows}: {rows: UserInterface[]}) => {
        return rows
    })
}
