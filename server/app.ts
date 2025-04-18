import express, { Application } from "express";
import cors from "cors";
import { apiRouter } from "./routes/api-router.ts";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

export default app;