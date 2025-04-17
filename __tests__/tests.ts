import { users, events } from "../db/data/index.ts"
import { EventInterface } from "../db/data/events.ts"
import { UserInterface } from "../db/data/users.ts"
import { seed } from "../db/seed/seed.ts"
const request = require("supertest")
const db = require("../db/connection.js")

beforeEach(async () => {
await seed(users, events);
  }, 15000);
  afterAll(async () => await db.end());


describe("Test Seed Function", () => {
    test("Should insert 6 events into events table", () => {
        return db.query("SELECT * FROM events").then(({rows}) => {
            console.log(rows)
        })
    })
})