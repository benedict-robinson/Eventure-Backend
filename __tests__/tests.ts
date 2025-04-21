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

xdescribe("Events", () => {
    xdescribe("GET events", () => {
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
          .get("/api/events?city=bristol")
          .expect(200)
          .then(({body: { events }}) => {
            events.forEach((e: EventInterface) => {
              expect(e.location?.city).toBe("bristol")
            })
          })
        })
        test("GET Events ? country - retrieves results filtered by country", () => {
          return request(app)
          .get("/api/events?countryCode=GB")
          .expect(200)
          .then(({ body: { events }}) => {
            events.forEach((e: EventInterface) => {
              expect(e.location?.country_code).toBe("GB")
            })
          })
        })
        test("GET Events ? category - retrieves results filtered by genre/category", () => {
          return request(app)
          .get("/api/events?classificationName=film")
          .expect(200)
          .then(({body: {events}}) => {
            events.forEach((e: EventInterface) => {
              const formattedTags = e.tags.map(tag => tag.toLowerCase())
              expect(formattedTags).toContain("film")
            })
          })
        })
        test("GET Events ? sort by date desc", () => {
          return request(app)
          .get("/api/events?sort=date-desc")
          .expect(200)
          .then(({body: {events}}) => {
            const startDates = events.map((e: any) => {
              return new Date(e.date_and_time.start_date).getTime()
            })
            const sortedDates = [...startDates].sort((a: number, b: number) => b - a)
            expect(startDates).toEqual(sortedDates)
          })
        })
        test("GET Events ? sort by date asc", () => {
          return request(app)
          .get("/api/events?sort=date-asc")
          .expect(200)
          .then(({body: {events}}) => {
            const startDates = events.map((e: any) => {
              return new Date(e.date_and_time.start_date).getTime()
            })
            const sortedDates = [...startDates].sort((a: number, b: number) => a - b)
            expect(startDates).toEqual(sortedDates)
          })
        })
        test("GET Events ? - queries work simultaneously", () => {
          return request(app)
          .get("/api/events?city=los+angeles&countryCode=US&classificationName=music&sort=date-asc")
          .expect(200)
          .then(({body: {events}}) => {
            events.forEach((e: EventInterface) => {
              expect(e.location?.city).toBe("los angeles")
              expect(e.location?.country_code).toBe("US")
              const formattedTags = e.tags.map(tag => tag.toLowerCase())
              expect(formattedTags).toContain("music")
            })
          })
        })
        describe("Get Events - Error Testing", () => {
          test("returns 404 when passed a valid query but no results", () => {
            return request(app)
            .get("/api/events?city=bristol&countryCode=FR")
            .expect(404)
            .then(({body: {msg}}) => {
              expect(msg).toBe("No Events Found")
            })
          })
          test("returns 400 Bad Request when passed an invalid query - invalid cc", () => {
            return request(app)
            .get("/api/events?countryCode=france")
            .expect(400)
            .then(({body: {msg}}) => {
              expect(msg).toBe("Bad Request")
            })
          })
          test("returns 400 Bad Request when passed an invalid query - numbers in string", () => {
            return request(app)
            .get("/api/events?city=68")
            .expect(400)
            .then(({body: {msg}}) => {
              expect(msg).toBe("Bad Request")
            })
          })
          test("returns 400 Bad Request when passed invalid sort - no hyphen", () => {
            return request(app)
            .get("/api/events?sort=dateasc")
            .expect(400)
            .then(({body: {msg}}) => {
              expect(msg).toBe("Bad Request")
            })
          })
          test("returns 400 Bad Request when passed invalid sort - not date", () => {
            return request(app)
            .get("/api/events?sort=test-asc")
            .expect(400)
            .then(({body: {msg}}) => {
              expect(msg).toBe("Bad Request")
            })
          })
          test("returns 400 Bad Request when passed invalid sort - not asc/desc", () => {
            return request(app)
            .get("/api/events?sort=date-test")
            .expect(400)
            .then(({body: {msg}}) => {
              expect(msg).toBe("Bad Request")
            })
          })
        })
    })
    describe("POST events by user_id", () => {
      test("Post Event - creates a new event", () => {
        const newEvent = {
          name: "Test Event",
          location: {
            city: "Bristol",
            country: "UK",
            country_code: "GB",
          },
          date_and_time: {
            start_date: "2025-04-21",
            start_time: 13,
            end_date: "2025-04-21",
            end_time: 16,
            timezone: "Europe/London",
          },
          tags: ["Arts & Theatre", "Film"],
          img: {
              url: "https://s1.ticketm.net/dam/a/7e0/479ac7e7-15fb-44ba-8708-fc1bf2d037e0_RETINA_PORTRAIT_3_2.jpg",
              ratio: "3_2",
              width: 640,
              height: 427,
            },
          info: "test info",
          description: "test description",
          url: "https://www.webpagetest.org/",
        }
        return request(app)
        .post("/api/events/2")
        .send(newEvent)
        .expect(201)
        .then(response => {
          console.log(response)
        })
        
      })
    })
})

describe("Users", () => {
  describe("GET Users", () => {
    test("GET Users returns an array of all users", () => {
      return request(app)
      .get("/api/users")
      .expect(200)
      .then(({body: {users}}) => {
        expect(users.length).toBe(3)
        const keys = ["user_id", "username", "email", "is_staff", "image_url"]
        users.forEach((user: UserInterface) => {
        expect(Object.keys(user)).toEqual(keys)
        })
      })
    })
  })
  describe("GET Users by username", () => {
    test("GET users by user_id returns a singular correct user with matching username", () => {
      const user = {
        username: "user1",
        email: "user1@example.com",
        is_staff: true,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash"
      }
      return request(app)
      .get("/api/users/user1")
      .expect(200)
      .then(({body: {user}}) => {
        expect(user).toEqual(user)
      })
    })
    test()
  })
})
