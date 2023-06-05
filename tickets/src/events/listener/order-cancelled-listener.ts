import { Listener, OrderCancelledEvent, Subjects } from "@bssbssticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./quene-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // remove orderId of the ticket, release it from order
    ticket.set({ orderId: undefined });
    // Save the ticket
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    // Ack the message
    msg.ack();
  }
}
