import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import nats, { Stan } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/listener/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listener/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listener/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listener/payment-created-listener";

const start = async () => {
  console.log("starting...");
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

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
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
