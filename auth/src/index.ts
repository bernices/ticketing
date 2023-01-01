import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  // a check that env variable is defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Ver 1");
    console.log("Listening on port 3000!");
  });
};

start();
