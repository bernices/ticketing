import { Subjects, Publisher, PaymentCreateEvent } from "@bssbssticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreateEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}