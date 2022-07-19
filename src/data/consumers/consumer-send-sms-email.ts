import { RabbitMQInterface, SendSMSPontalInterface } from "@/data/interfaces";

export class SendSMSEmailConsumer {
  constructor(
    private readonly rabbitmq: RabbitMQInterface,
    private readonly pontal: SendSMSPontalInterface
  ) {}
  consume() {
    this.rabbitmq.consume("send_pending", (message) => {
      console.log(message.content.toString);
    });
  }
}
