import { OrderCreatedListener } from "./events/listener/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // a check that env variable is defined

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
  } catch (err) {
    console.log(err);
  }
};

start();
