import { Connection, Channel, connect, Message, ConsumeMessage } from "amqplib";
import { RabbitMQInterface } from "@/data/interfaces";

export class RabbitMQ implements RabbitMQInterface {
  //@ts-ignore
  private conn: Connection;
  //@ts-ignore
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publish(queue: string, message: string): Promise<Boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      //@ts-ignore
      callback(message);
      //@ts-ignore
      // this.channel.ack(message);
    });
  }

  async publishInExchange(
    exchange: string,
    routingkey: string,
    message: string
  ): Promise<Boolean> {
    try {
      const published = this.channel.publish(
        exchange,
        routingkey,
        Buffer.from(message)
      );
      return published;
    } catch (error) {
      return false;
    }
  }
}
