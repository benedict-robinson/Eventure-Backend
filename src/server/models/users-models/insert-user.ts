import format from "pg-format";
import { UserInterface } from "../../../db/data/users";

const db = require("../../../db/connection");

export const insertUser = (newUser: UserInterface) => {
  const { username, email, is_staff, image_url } = newUser;
  const keys = Object.keys(newUser)
  if (!keys.includes("username") || !keys.includes("is_staff")) {
    return Promise.reject({status: 400, msg: "Bad Request"})
  }
  const insertUserQuery = format(`
        INSERT INTO users (username, email, is_staff, image_url)
        VALUES %L RETURNING *`,
    [[username, email, is_staff, image_url]]);
    return db.query(insertUserQuery)
    .then(({rows}: {rows: UserInterface[]}) => {
        return rows[0]
    })
};
