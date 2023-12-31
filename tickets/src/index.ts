import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import nats, { Stan } from "node-nats-streaming";
import { OrderCreatedListener } from "./events/listener/order-created-listener";
import { OrderCancelledListener } from "./events/listener/order-cancelled-listener";

const start = async () => {
  console.log("Starting ticket");
  // a check that env variable is defined
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    2;
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Ver 1");
    console.log("Listening on port 3000!");
  });
};

start();
