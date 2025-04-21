import express, { Application } from "express";
import cors from "cors";
import { apiRouter } from "./routes/api-router.ts";
import { customErrorHandler } from "./errors/custom-errors.ts";
import { serverErrorHandler } from "./errors/server-error.ts";
import { inputErrorHandler } from "./errors/input-error.ts";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);





app.use(customErrorHandler);
app.use(serverErrorHandler)

export default app;