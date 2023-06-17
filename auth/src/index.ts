import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  console.log("Starting up");
  // a check that env variable is defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must defined");
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
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
