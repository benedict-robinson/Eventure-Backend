const db = require("../connection.js");
const format = require("pg-format");
import { EventInterface } from "../data/events";
import { UserInterface } from "../data/users";
import { formatArray } from "../../utils";

export const seed = (
  userData: UserInterface[],
  eventsData: EventInterface[]
) => {
  const dropMyEventsPromise = db.query(
    "DROP TABLE IF EXISTS user_my_events CASCADE"
  );
  const dropGoingPromise = db.query(
    "DROP TABLE IF EXISTS user_going CASCADE"
  );
  const dropFavouritesPromise = db.query(
    "DROP TABLE IF EXISTS user_favourites CASCADE"
  );
  return (
    Promise.all([dropFavouritesPromise, dropGoingPromise, dropMyEventsPromise])
      .then(() => {
        return db.query("DROP TABLE IF EXISTS users CASCADE");
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS events CASCADE`);
      })
      .then(() => {
        return db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        api_event_id VARCHAR(25),
        name VARCHAR(200) NOT NULL,
        location JSONB,
        date_and_time JSONB,
        tags TEXT[],
        img JSONB,
        info TEXT,
        description TEXT NOT NULL,
        url TEXT
      );`);
      })
      .then(() => {
        return db.query(`
            CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20) NOT NULL,
            email VARCHAR(50),
            is_staff BOOLEAN NOT NULL,
            image_url TEXT
        );`);
      })
      .then(() => {
        const createMyEventsPromise = db.query(`CREATE TABLE user_my_events (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`);
        const createGoingPromise = db.query(`CREATE TABLE user_going (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`);
        const createFavouritesPromise = db.query(`CREATE TABLE user_favourites (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`);
        return Promise.all([
          createFavouritesPromise,
          createGoingPromise,
          createMyEventsPromise,
        ]);
      })
      .then(() => {
        
        const insertEventsQuery = format(
          "INSERT INTO events (api_event_id, name, location, date_and_time, tags, img, info, description, url) VALUES %L;",
          eventsData.map(
            ({
              api_event_id,
              name,
              location,
              date_and_time,
              tags,
              img,
              info,
              description,
              url,
            }) => [
              api_event_id || null,
              name,
              location,
              date_and_time,
              formatArray(tags),
              img,
              info,
              description,
              url,
            ]
          )
        );
        const insertEventsPromise = db.query(insertEventsQuery);
        const insertUsersQuery = format(
          "INSERT INTO users (username, email, is_staff, image_url) VALUES %L;",
          userData.map(({ username, email, is_staff, image_url }) => [
            username,
            email,
            is_staff,
            image_url,
          ])
        );
        const insertUsersPromise = db.query(insertUsersQuery);
        
        return Promise.all([insertEventsPromise, insertUsersPromise]);
      })
      .then(() => {
        const insertMyEvents = format(
          "INSERT INTO user_my_events (user_id, event_id) VALUES %L;",
          [
            [1, 2],
            [1, 3],
          ]
        );
        const insertFavourites = format(
          "INSERT INTO user_favourites (user_id, event_id) VALUES %L;",
          [
            [1, 1],
            [1, 3],
            [1, 6],
            [2, 3],
            [2, 5],
            [3, 2],
          ]
        );
        const insertGoing = format(
          "INSERT INTO user_going (user_id, event_id) VALUES %L;",
          [
            [1, 2],
            [1, 3],
            [2, 3],
          ]
        );
        return Promise.all([
          db.query(insertFavourites),
          db.query(insertGoing),
          db.query(insertMyEvents),
        ]);
      })
      .then(() => {
        console.log("✅ Seeding complete!");
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error(err.message);
          console.log(err);
        } else {
          console.error("Unknown error:", err);
        }
        throw err;
      })
  );
};
