import { Message } from "amqplib";

export interface RabbitMQInterface {
  start(uri: string): Promise<void>;
  publish(queue: string, message: string): Promise<Boolean>;
  consume(queue: string, callback: (message: Message) => void): any;
  publishInExchange(
    exchange: string,
    routingkey: string,
    message: string
  ): Promise<Boolean>;
}
