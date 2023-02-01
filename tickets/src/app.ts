import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@bssbssticket/common";
import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false, //not encrypt
    secure: process.env.NODE_ENV !== "test", //use https for not testing
  })
);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
