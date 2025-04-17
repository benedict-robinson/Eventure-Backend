const db = require("../connection.js");
const format = require("pg-format");

export const seed = ({ userData, eventsData }) => {
  return db
    .query("BEGIN")
    .then(() => {
      const dropMyEventsPromise = db.query(
        `DROP TABLE IF EXISTS user_my_events`
      );
      const dropGoingPromise = db.query(`DROP TABLE IF EXISTS user_going`);
      const dropFavouritesPromise = db.query(
        `DROP TABLE IF EXISTS user_favourites`
      );
      return Promise.all([
        dropFavouritesPromise,
        dropGoingPromise,
        dropMyEventsPromise,
      ]);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        api_event_id VARCHAR(15),
        name VARCHAR(100) NOT NULL,
        location JSONB,
        date_and_time JSONB,
        tags TEXT[],
        img JSONB,
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
            my_events_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE
            )`);
      const createGoingPromise = db.query(`CREATE TABLE user_going (
            going_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE
            )`);
      const createFavouritesPromise = db.query(`CREATE TABLE user_favourites (
            favourite_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE
            )`);
      return Promise.all([
        createFavouritesPromise,
        createGoingPromise,
        createMyEventsPromise,
      ]);
    })
    .then(() => {
      const insertEventsQuery = format(
        "INSERT INTO events (api_event_id, name, location, date_and_time, tags, img, description, url) VALUES %L;",
        eventsData.map(
          ({
            api_event_id,
            name,
            location,
            date_and_time,
            tags,
            img,
            description,
            url,
          }) => [
            api_event_id,
            name,
            location,
            date_and_time,
            tags,
            img,
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
        return db.query("COMMIT");
      })
      .then(() => {
        console.log("✅ Seeding complete!");
      })
      .catch((err) => {
        return db.query("ROLLBACK")
          .then(() => {
            console.error("❌ Seeding failed, rolled back.");
            console.error(err);
            throw err;
          });
      });
};
