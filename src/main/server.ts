import "module-alias/register";

import dotenv from "dotenv";

import path from "path";
import moduleAlias from "module-alias";
import { RabbitMQ } from "@/infra/message-broker";
import { MakeSendSMSEmailConsumer } from "./factories/consumer-send-sms-email";

moduleAlias.addAlias("@", path.join(__dirname, "../"));

dotenv.config();

async function StartRabbitMQ() {
  const connection = new RabbitMQ(process.env.URI_SERVER_RABBITMQ as string);

  await connection.start();

  MakeSendSMSEmailConsumer(connection).consume();
}
StartRabbitMQ();
