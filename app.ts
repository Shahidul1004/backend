import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import HttpError from "./models/http-error";
import registrationRoute from "./routes/registration-route";
import validate from "./validation/validate";
import registrationValidationRules from "./validation/registration-validation-rules";

const app: express.Application = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Cache-Control", "s-max-age=5, stale-while-revalidate");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(
  "/api/registration",
  registrationValidationRules(),
  validate,
  registrationRoute
);

app.use((req, res, next) => {
  const error = new HttpError("Could not find a route", 404);
  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong!" });
});

app.listen(5000, () => {
  console.log("server started");
});
