import { SendEmailModel } from "../models";

export interface SendEmailParams {
  email: string;
  subject?: string;
  html?: string;
}

export interface UCSendEmail {
  send(params: SendEmailParams): Promise<SendEmailModel>;
}
