import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@bssbssticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
