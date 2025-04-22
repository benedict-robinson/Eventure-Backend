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

describe("Test Seed Function", () => {
  test("Should insert 6 events into events table", () => {
    return db
      .query("SELECT * FROM events")
      .then(({ rows }: { rows: EventInterface[] }) => {
        expect(rows.length).toBe(6);
        console.log(rows);
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
        rows.forEach((row) => {
          expect(Object.keys(row)).toEqual(["user_id", "event_id"]);
        });
      });
  });
  test("Should insert 6 values into user_favourites with correct keys", () => {
    return db
      .query("SELECT * FROM user_favourites")
      .then(({ rows }: { rows: { user_id: number; event_id: number }[] }) => {
        expect(rows.length).toBe(6);
        rows.forEach((row) => {
          expect(Object.keys(row)).toEqual(["user_id", "event_id"]);
        });
      });
  });
  test("Should insert 3 values into user_my_events with correct keys", () => {
    return db
      .query("SELECT * FROM user_going")
      .then(({ rows }: { rows: { user_id: number; event_id: number }[] }) => {
        expect(rows.length).toBe(3);
        rows.forEach((row) => {
          expect(Object.keys(row)).toEqual(["user_id", "event_id"]);
        });
      });
  });
});

describe("Events", () => {
  describe("GET events", () => {
    test("GET Events - returns array of events", () => {
      return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } }) => {
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
          expect(Array.isArray(events)).toBe(true);
          events.forEach((e: EventInterface) => {
            expect(Object.keys(e)).toEqual(keys);
          });
        });
    });
    test("GET Events - retrieves results from Ticketmaster API", () => {
      return request(app)
        .get("/api/events")
        .expect(200)
        .then(({ body: { events } }) => {
          expect(events.length).toBeGreaterThan(6);
          const ticketMasterEvents = events.filter(
            (e: EventInterface) => e.api_event_id !== null
          );
          expect(events.length - ticketMasterEvents.length).toBe(2);
        });
    });
    test("GET Events ? city - retrieves results filtered by city", () => {
      return request(app)
        .get("/api/events?city=bristol")
        .expect(200)
        .then(({ body: { events } }) => {
          events.forEach((e: EventInterface) => {
            expect(e.location?.city).toBe("bristol");
          });
        });
    });
    test("GET Events ? country - retrieves results filtered by country", () => {
      return request(app)
        .get("/api/events?countryCode=GB")
        .expect(200)
        .then(({ body: { events } }) => {
          events.forEach((e: EventInterface) => {
            expect(e.location?.country_code).toBe("GB");
          });
        });
    });
    test("GET Events ? category - retrieves results filtered by genre/category", () => {
      return request(app)
        .get("/api/events?classificationName=film")
        .expect(200)
        .then(({ body: { events } }) => {
          events.forEach((e: EventInterface) => {
            const formattedTags = e.tags.map((tag) => tag.toLowerCase());
            expect(formattedTags).toContain("film");
          });
        });
    });
    test("GET Events ? sort by date desc", () => {
      return request(app)
        .get("/api/events?sort=date-desc")
        .expect(200)
        .then(({ body: { events } }) => {
          const startDates = events.map((e: any) => {
            return new Date(e.date_and_time.start_date).getTime();
          });
          const sortedDates = [...startDates].sort(
            (a: number, b: number) => b - a
          );
          expect(startDates).toEqual(sortedDates);
        });
    });
    test("GET Events ? sort by date asc", () => {
      return request(app)
        .get("/api/events?sort=date-asc")
        .expect(200)
        .then(({ body: { events } }) => {
          const startDates = events.map((e: any) => {
            return new Date(e.date_and_time.start_date).getTime();
          });
          const sortedDates = [...startDates].sort(
            (a: number, b: number) => a - b
          );
          expect(startDates).toEqual(sortedDates);
        });
    });
    test("GET Events ? - queries work simultaneously", () => {
      return request(app)
        .get(
          "/api/events?city=los+angeles&countryCode=US&classificationName=music&sort=date-asc"
        )
        .expect(200)
        .then(({ body: { events } }) => {
          events.forEach((e: EventInterface) => {
            expect(e.location?.city).toBe("los angeles");
            expect(e.location?.country_code).toBe("US");
            const formattedTags = e.tags.map((tag) => tag.toLowerCase());
            expect(formattedTags).toContain("music");
          });
        });
    });
    describe("Get Events - Error Testing", () => {
      test("returns 404 when passed a valid query but no results", () => {
        return request(app)
          .get("/api/events?city=bristol&countryCode=FR")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("No Events Found");
          });
      });
      test("returns 400 Bad Request when passed an invalid query - invalid cc", () => {
        return request(app)
          .get("/api/events?countryCode=france")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("returns 400 Bad Request when passed an invalid query - numbers in string", () => {
        return request(app)
          .get("/api/events?city=68")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("returns 400 Bad Request when passed invalid sort - no hyphen", () => {
        return request(app)
          .get("/api/events?sort=dateasc")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("returns 400 Bad Request when passed invalid sort - not date", () => {
        return request(app)
          .get("/api/events?sort=test-asc")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("returns 400 Bad Request when passed invalid sort - not asc/desc", () => {
        return request(app)
          .get("/api/events?sort=date-test")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("GET events by event_id", () => {
    test("Get Event by event_id returns correct event", () => {
      const event3 = {
        event_id: 3,
        api_event_id: null,
        name: "JavaScript Conference 2025",
        location: {
          city: "San Francisco",
          country: "USA",
          country_code: "US",
        },
        date_and_time: {
          start_date: "2025-06-12",
          start_time: 9,
          end_date: "2025-06-14",
          end_time: 17,
          timezone: "PST",
        },
        tags: ["tech", "javascript", "conference"],
        img: {
          url: "https://example.com/jsconf.png",
          ratio: "3_2",
          width: 1024,
          height: 683,
        },
        info: "The biggest JS conference of the year.",
        description:
          "Speakers from top companies, hands-on workshops, and cool swag.",
        url: "https://ticket.link/event/jsconf",
      };
      return request(app)
        .get("/api/events/event/3")
        .expect(200)
        .then(({ body: { event } }) => {
          // console.log(body)
          expect(event).toEqual(event3);
        });
    });
    describe("GET Event by event_id - error handling", () => {
      test("returns 404 not found when passed non-existent event", () => {
        return request(app)
          .get("/api/events/event/19")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Event Not Found");
          });
      });
      test("returns 400 not found when passed an invalid event id", () => {
        return request(app)
          .get("/api/events/event/test")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("POST events by username", () => {
    test("Post Event - returns user_my_events entry", () => {
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
      };
      return request(app)
        .post("/api/events/user1")
        .send(newEvent)
        .expect(201)
        .then(({ body }) => {
          const { user_id, event_id } = body;
          expect(user_id).toBe(1);
          expect(event_id).toBe(7);
        });
    });
    test("POST event - adds event to the database", () => {
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
      };
      return request(app)
        .post("/api/events/user1")
        .send(newEvent)
        .expect(201)
        .then((response) => {
          return db
            .query("SELECT * FROM events")
            .then(({ rows }: { rows: EventInterface[] }) => {
              const insertedEvent = rows.filter((e) => e.name === "Test Event");
              const testInsertedEvent = {
                ...newEvent,
                api_event_id: null,
                event_id: 7,
              };
              expect(insertedEvent).toHaveLength(1);
              expect(insertedEvent[0]).toEqual(testInsertedEvent);
            });
        });
    });
    describe("POST Event by username - error handling", () => {
      test("returns 401 unauthorized when not staff", () => {
        const newEvent = {
          name: "test",
          tags: [],
          description: "test description",
        };
        return request(app)
          .post("/api/events/user2")
          .send(newEvent)
          .expect(401)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Unauthorized");
          });
      });
      test("returns 404 User Not Found when attempting to post with a non-existent username", () => {
        const newEvent = {
          name: "test",
          tags: [],
          description: "test description",
        };
        return request(app)
          .post("/api/events/test-user")
          .send(newEvent)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User Not Found");
          });
      });
      test("returns 400 Bad Request when attempting to post event with missing required keys", () => {
        const newEvent = {
          info: "test info",
          url: "https://www.webpagetest.org/",
        };
        return request(app)
          .post("/api/events/user1")
          .send(newEvent)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request - More Information Required");
          });
      });
    });
  });
  describe("PATCH Events by username", () => {
    test("PATCH events - updates and returns event", () => {
      const eventPatch = { description: "new description", name: "new name" };
      return request(app)
        .patch("/api/events/user1/event/3")
        .send(eventPatch)
        .expect(200)
        .then(({ body: { event } }) => {
          expect(event.event_id).toBe(3);
          expect(event.description).toBe("new description");
          expect(event.name).toBe("new name");
        });
    });
    test("PATCH events - works with objects", () => {
      const eventPatch = {
        description: "new description",
        location: { city: "Bronx", country: "USA", country_code: "US" },
        date_and_time: {
          start_date: "2025-04-26",
          start_time: 13,
          end_date: "2025-04-26",
          end_time: 16,
          timezone: "America/New_York",
        },
      };
      return request(app)
        .patch("/api/events/user1/event/3")
        .send(eventPatch)
        .expect(200)
        .then(({ body: { event } }) => {
          expect(event.event_id).toBe(3);
          expect(event.description).toBe("new description");
          expect(event.location).toEqual({
            city: "Bronx",
            country: "USA",
            country_code: "US",
          });
          expect(event.date_and_time).toEqual({
            start_date: "2025-04-26",
            start_time: 13,
            end_date: "2025-04-26",
            end_time: 16,
            timezone: "America/New_York",
          });
        });
    });
    test("PATCH events - works for unnecessary keys", () => {
      const eventPatch = {
        description: "new description",
        test: "test-key",
        notAKey: "this is not a key",
      };
      return request(app)
        .patch("/api/events/user1/event/3")
        .send(eventPatch)
        .expect(200)
        .then(({ body: { event } }) => {
          expect(event.event_id).toBe(3);
          expect(event.description).toBe("new description");
          expect(Object.keys(event).includes("test")).toBe(false);
          expect(Object.keys(event).includes("notAKey")).toBe(false);
        });
    });
    describe("PATCH events - error testing", () => {
      test("returns 401 Unauthorized when not staff", () => {
        const eventPatch = { description: "new description", name: "new name" };
        return request(app)
          .patch("/api/events/user2/event/3")
          .send(eventPatch)
          .expect(401)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Unauthorized");
          });
      });
      test("returns 401 Unauthorized when not owner of the event", () => {
        const eventPatch = { description: "new description", name: "new name" };
        return request(app)
          .patch("/api/events/user1/event/7")
          .send(eventPatch)
          .expect(401)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Unauthorized");
          });
      });
      test("returns 404 when passed non-existent user", () => {
        const eventPatch = { description: "new description", name: "new name" };
        return request(app)
          .patch("/api/events/test-user/event/3")
          .send(eventPatch)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User Not Found");
          });
      });
      test("returns 400 Bad Request when not passed event_id", () => {
        const eventPatch = { description: "new description", name: "new name" };
        return request(app)
          .patch("/api/events/user2/event/")
          .send(eventPatch)
          .expect(500)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Internal server error!");
          });
      });
      test("returns 400 Bad Request when passed an invalid event_id", () => {
        const eventPatch = { description: "new description", name: "new name" };
        return request(app)
          .patch("/api/events/user2/event/test")
          .send(eventPatch)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request - Invalid Event");
          });
      });
    });
  });
  describe("DELETE events by event_id", () => {
    test("DELETE events - deletes event", () => {
      return request(app)
        .delete("/api/events/user1/event/2")
        .expect(202)
        .then(() => {
          return db
            .query("SELECT * FROM events")
            .then(({ rows }: { rows: EventInterface[] }) => {
              rows.forEach((e) => {
                expect(e.event_id);
              });
              const filteredRows = rows.filter((e) => e.event_id === 2);
              expect(filteredRows).toHaveLength(0);
            });
        });
    })
    test("DELETE events - deletes from user_my_events", () => {
      return request(app)
      .delete("/api/events/user1/event/2")
      .expect(202)
      .then(() => {
        return db
          .query("SELECT * FROM user_my_events")
          .then(({ rows }: { rows: {user_id: number, event_id: number}[] }) => {
            rows.forEach((e) => {
              expect(e.event_id);
            });
            const filteredRows = rows.filter((e) => e.event_id === 2);
            expect(filteredRows).toHaveLength(0);
          });
      });
    })
    describe("DELETE events - error testing", () => {
      test("returns 404 when passed non-existent event_id", () => {
        return request(app)
          .delete("/api/events/user1/event/15")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Event Not Found");
          });
      });
      test("returns 400 Bad Request when passed an invalid event_id", () => {
        return request(app)
          .delete("/api/events/user1/event/test")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request - Invalid Event");
          });
      });
      test("returns 401 Unauthorized when not staff", () => {
        return request(app)
          .delete("/api/events/user2/event/2")
          .expect(401)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Unauthorized");
          });
      });
      test("returns 401 Unauthorized when not the owner of the event", () => {
        return request(app)
          .delete("/api/events/user1/event/1")
          .expect(401)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Unauthorized");
          });
      });
    });
  });
});

describe("Users", () => {
  describe("GET Users", () => {
    test("GET Users returns an array of all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.length).toBe(3);
          const keys = [
            "user_id",
            "username",
            "email",
            "is_staff",
            "image_url",
          ];
          users.forEach((user: UserInterface) => {
            expect(Object.keys(user)).toEqual(keys);
          });
        });
    });
  });
  describe("GET Users by username", () => {
    test("GET users by user_id returns a singular correct user with matching username", () => {
      const user = {
        username: "user1",
        email: "user1@example.com",
        is_staff: true,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
      };
      return request(app)
        .get("/api/users/user1")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toEqual(user);
        });
    });
    test("404 Not Found - returns 404 when passed a non-existent user", () => {
      return request(app)
        .get("/api/users/test-user")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User Not Found");
        });
    });
  });
  describe("POST User", () => {
    test("POST User creates a new user", () => {
      const newUser: UserInterface = {
        username: "test-user",
        email: "test@example.com",
        is_staff: true,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { user } }) => {
          newUser.user_id = 4;
          expect(user).toEqual(newUser);
          return db
            .query("SELECT * FROM users")
            .then(({ rows }: { rows: UserInterface[] }) => {
              const filteredUsers = rows.filter(
                (e) => e.username === "test-user"
              );
              expect(filteredUsers).toHaveLength(1);
            });
        });
    });
    test("POST user - works with only required keys", () => {
      const newUser: UserInterface = {
        username: "test-user",
        is_staff: true
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body: { user } }) => {
          return db
            .query("SELECT * FROM users")
            .then(({ rows }: { rows: UserInterface[] }) => {
              const filteredUsers = rows.filter(
                (e) => e.username === "test-user"
              );
              expect(filteredUsers).toHaveLength(1);
            });
        });
    });
    describe("POST User - Error Handling", () => {
      test("POST User - returns 400 bad request when missing required keys", () => {
        const newUser = {
          email: "test-email@email.com"
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({body: {msg}}) => {
          expect(msg).toBe("Bad Request")
        })
      })
      test("returns 400 bad request when attempting to use same username as another user", () => {
        const newUser = {
          username: "user3",
          email: "test@example.com",
          is_staff: true,
          image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
        }
        return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({body: {msg}}) => {
          expect(msg).toBe("Bad Request")
        })
      })
    })
  });
  describe("PATCH user by username", () => {
    test("PATCH User by username - updates user correctly", () => {
      const newUser = {image_url: "https://avatar.iran.liara.run/public/boy?username=Charlie"}
      const testUser = {
        user_id: 2,
        username: "user2",
        email: "user2@example.com",
        is_staff: false,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Charlie"
      }
      return request(app)
      .patch("/api/users/user2")
      .send(newUser)
      .expect(200)
      .then(({body: {user}}) => {
        expect(user).toEqual(testUser)
      })
    })
    describe("PATCH user - error handling", () => {
      test("returns 404 when given non-existent username", () => {
        const newUser = {image_url: "https://avatar.iran.liara.run/public/boy?username=Charlie"}
        return request(app)
        .patch("/api/users/test-user")
        .send(newUser)
        .expect(404)
        .then(({body: {msg}}) => {
          expect(msg).toBe("User Not Found")
        })
      })
      test("does not update user_id", () => {
        const newUser = {user_id: 9, image_url: "https://avatar.iran.liara.run/public/boy?username=Charlie"}
        const testUser = {
          user_id: 2,
          username: "user2",
          email: "user2@example.com",
          is_staff: false,
          image_url: "https://avatar.iran.liara.run/public/boy?username=Charlie"
        }
        return request(app)
        .patch("/api/users/user2")
        .send(newUser)
        .expect(200)
        .then(({body: {user}}) => {
          expect(user).toEqual(testUser)
        })
      })
    })
  })
  describe.only("DELETE user by username", () => {
    test("DELETE user by username deletes specified user", () => {
      return request(app)
      .delete("/api/users/user2")
      .expect(200)
      .then(() => {
        return db.query("SELECT * FROM users")
        .then(({rows}: {rows: UserInterface[]}) => {
          const filteredUsers = rows.filter(e => e.username === "user2")
          expect(filteredUsers).toHaveLength(0)
          expect(rows).toHaveLength(2)
        })
      })
    })
  })
});
