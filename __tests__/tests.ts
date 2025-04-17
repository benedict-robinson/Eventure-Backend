import { users, events } from "../db/data/index.ts"
import { EventInterface } from "../db/data/events.ts"
import { UserInterface } from "../db/data/users.ts"
import { seed } from "../db/seed/seed.ts"
const request = require("supertest")
const db = require("../db/connection.js")

beforeEach(async () => {
await seed(users, events);
  });
  afterAll(async () => await db.end());

