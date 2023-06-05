import { Publisher, OrderCancelledEvent, Subjects } from "@bssbssticket/common";
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
