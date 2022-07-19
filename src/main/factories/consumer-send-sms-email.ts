import { SendSMSEmailConsumer } from "@/data/consumers";
import { SendSMSPontal } from "@/data/entities";
import { RabbitMQInterface } from "@/data/interfaces";
import { AxiosHttpAdapter } from "@/infra/http";

export function MakeSendSMSEmailConsumer(
  rabbitMQ: RabbitMQInterface
): SendSMSEmailConsumer {
  const httpClient = new AxiosHttpAdapter();
  const sendsms = new SendSMSPontal(httpClient);
  return new SendSMSEmailConsumer(rabbitMQ, sendsms);
}
