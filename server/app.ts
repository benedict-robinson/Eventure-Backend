import express, { Application } from "express";
import cors from "cors";
import { apiRouter } from "./routes/api-router.ts";
import { customErrorHandler } from "./errors/custom-errors.ts";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);



app.use(customErrorHandler);

export default app;