import { Message } from "node-nats-streaming";
import mongoose, { set } from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedEvent } from "@bssbssticket/common";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  // create a fake data event
  const data: TicketUpdatedEvent["data"] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: "new",
    price: 10,
    userId: "test1234",
  };
  // create a fake message object
  // @ts-expect-error
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { listener, data, msg, ticket };
};

it("finds, updates and save a ticket", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("dose not call ack if the event has a skipped version number", async () => {
  const { msg, data, ticket, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
