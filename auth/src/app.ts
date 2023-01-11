import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentuserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
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
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };