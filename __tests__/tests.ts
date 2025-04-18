import { users, events } from "../db/data/index.ts";
import { EventInterface } from "../db/data/events.ts";
import { UserInterface } from "../db/data/users.ts";
import { seed } from "../db/seed/seed.ts";
const request = require("supertest");
const db = require("../db/connection.js");

beforeEach(async () => {
  await seed(users, events);
}, 15000);
afterAll(async () => await db.end());

describe("Test Seed Function", () => {
  test("Should insert 6 events into events table", () => {
    return db
      .query("SELECT * FROM events")
      .then(({ rows }: { rows: EventInterface[] }) => {
        expect(rows.length).toBe(6);
      });
  });
  test("Events should have correct keys", () => {
    return db
      .query("SELECT * FROM events")
      .then(({ rows }: { rows: EventInterface[] }) => {
        const keys = [
          "event_id",
          "api_event_id",
          "name",
          "location",
          "date_and_time",
          "tags",
          "img",
          "info",
          "description",
          "url",
        ];
        rows.forEach((event) => {
          expect(Object.keys(event)).toEqual(keys);
        });
      });
  });
  test("Should insert 3 users into users table", () => {
    return db
      .query("SELECT * FROM users")
      .then(({ rows }: { rows: UserInterface[] }) => {
        expect(rows.length).toBe(3);
      });
  });
  test("Users should have correct keys", () => {
    return db
      .query("SELECT * FROM users")
      .then(({ rows }: { rows: UserInterface[] }) => {
        const keys = ["user_id", "username", "email", "is_staff", "image_url"];
        rows.forEach((event) => {
          expect(Object.keys(event)).toEqual(keys);
        });
      });
  });
  test("Should insert 2 values into user_my_events with correct keys", () => {
    return db
      .query("SELECT * FROM user_my_events")
      .then(({ rows }: { rows: { user_id: number; event_id: number }[] }) => {
        expect(rows.length).toBe(2);
        rows.forEach(row => {
            expect(Object.keys(row)).toEqual(["user_id", "event_id"])
        })
      });
  });
  test("Should insert 6 values into user_favourites with correct keys", () => {
    return db
      .query("SELECT * FROM user_favourites")
      .then(({ rows }: { rows: { user_id: number; event_id: number }[] }) => {
        expect(rows.length).toBe(6);
        rows.forEach(row => {
            expect(Object.keys(row)).toEqual(["user_id", "event_id"])
        })
      });
  });
  test("Should insert 3 values into user_my_events with correct keys", () => {
    return db
      .query("SELECT * FROM user_going")
      .then(({ rows }: { rows: { user_id: number; event_id: number }[] }) => {
        expect(rows.length).toBe(3);
        rows.forEach(row => {
            expect(Object.keys(row)).toEqual(["user_id", "event_id"])
        })
      });
  });
});
