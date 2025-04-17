const db = require("../connection.js")

const seed = ({userData, eventsData}) => {
    const dropMyEventsPromise = db.query(`DROP TABLE IF EXISTS user_my_events`) 
    const dropGoingPromise = db.query(`DROP TABLE IF EXISTS user_going`)
    const dropFavouritesPromise = db.query(`DROP TABLE IF EXISTS user_favourites`)
    return Promise.all([dropFavouritesPromise, dropGoingPromise, dropMyEventsPromise])
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS users`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS events`)
    })
    .then(() => {
        return db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        api_key_id VARCHAR(15),
        name VARCHAR(100) NOT NULL,
        location JSONB,
        date_and_time JSONB,
        tags TEXT[],
        img JSONB,
        description TEXT NOT NULL,
        url TEXT
      );`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20) NOT NULL,
            email VARCHAR(50),
            is_staff BOOLEAN NOT NULL,
            avatar_img TEXT
        );`)
    })
    .then(() => {
        const createMyEvents = db.query(`CREATE TABLE user_my_events (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`)
        const createGoing = db.query(`CREATE TABLE user_going (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`)
        const createFavourites = db.query(`CREATE TABLE user_favourites (
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
            PRIMARY KEY (user_id, event_id)
            )`)
        return Promise.all([createFavourites, createGoing, createMyEvents])
    })
}