import express, { Application } from "express";
import cors from "cors";
import { apiRouter } from "./routes/api-router";
import { customErrorHandler } from "./errors/custom-errors";
import { serverErrorHandler } from "./errors/server-error";
import { inputErrorHandler } from "./errors/input-error";
import { psqlErrorHandler } from "./errors/psql-errors";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);




app.use(psqlErrorHandler)
app.use(customErrorHandler);
app.use(serverErrorHandler)

export default app;