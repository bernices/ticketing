import {
  Listener,
  OrderStatus,
  PaymentCreateEvent,
  Subjects,
} from "@bssbssticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-names";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreateEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreateEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    // actually it is better to emit a event about order update

    msg.ack();
  }
}
