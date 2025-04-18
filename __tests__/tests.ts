import { users, events } from "../db/data/index.ts";
import { EventInterface } from "../db/data/events.ts";
import { UserInterface } from "../db/data/users.ts";
import { seed } from "../db/seed/seed.ts";
import request from "supertest";
import app from "../server/app.ts";
const db = require("../db/connection.js");

beforeEach(async () => {
  await seed(users, events);
}, 15000);
afterAll(async () => await db.end());

xdescribe("Test Seed Function", () => {
  test("Should insert 6 events into events table", () => {
    return db
      .query("SELECT * FROM events")
      .then(({ rows }: { rows: EventInterface[] }) => {
        expect(rows.length).toBe(6);
        console.log(rows)
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

describe("Events", () => {
    describe("GET events", () => {
        test("GET Events - returns array of events", () => {
            return request(app)
            .get("/api/events")
            .expect(200)
            .then(({body: {events}}) => {
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
                expect(Array.isArray(events)).toBe(true)
                events.forEach((e: EventInterface) => {
                    expect(Object.keys(e)).toEqual(keys)
                })
            })
        })
        test("GET Events - retrieves results from Ticketmaster API", () => {
            return request(app)
            .get("/api/events")
            .expect(200)
            .then(({body: {events}}) => {
                expect(events.length).toBeGreaterThan(6)
                const ticketMasterEvents = events.filter((e: EventInterface) => e.api_event_id !== null)
                expect(events.length - ticketMasterEvents.length).toBe(2)
            })
        })
        test("GET Events ? city - retrieves results filtered by city", () => {
          return request(app)
          .get("/api/events?city=manchester")
          .expect(200)
          .then(({body: { events }}) => {
            events.forEach((e: EventInterface) => {
              expect(e.location?.city).toBe("manchester")
            })
          })
        })
    })
})
