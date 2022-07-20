import { RabbitMQInterface, SendSMSPontalInterface } from "@/data/interfaces";
import {
  SendSMSEmailConsumerParams,
  UCSendSMSEmailConsumer,
} from "@/domain/usecases/consumers";

export class SendSMSEmailConsumer implements UCSendSMSEmailConsumer {
  constructor(
    private readonly rabbitmq: RabbitMQInterface,
    private readonly pontal: SendSMSPontalInterface
  ) {}
  async consume() {
    this.rabbitmq.consume("send_pending", async (message) => {
      try {
        const parsedMessage = JSON.parse(
          message.content.toString()
        ) as SendSMSEmailConsumerParams;
        if (parsedMessage.type === "S") {
          //SMS
          if (parsedMessage.partner === "PT") {
            // PONTAL TECH
            const responsePontal = await this.pontal.send({
              number: parsedMessage.key,
              message: parsedMessage.content,
            });
            if (responsePontal.success) {
              this.rabbitmq.publish(
                "send_success",
                JSON.stringify(parsedMessage)
              );
            }
            const errorMessage = {
              ...parsedMessage,
              errorMessage: responsePontal.errorMessage,
            };
            this.rabbitmq.publish("send_error", JSON.stringify(errorMessage));
          }
        }
      } catch (error) {
        this.rabbitmq.publish("send_error", message.content.toString());
      }
    });
  }
}
