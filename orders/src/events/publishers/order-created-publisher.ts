import { Publisher, OrderCreatedEvent, Subjects } from "@bssbssticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
