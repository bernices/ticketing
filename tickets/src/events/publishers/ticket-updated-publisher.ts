import { Publisher, Subjects, TicketUpdatedEvent } from "@bssbssticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}