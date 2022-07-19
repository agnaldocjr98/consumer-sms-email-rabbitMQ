import { SendSMSPontalModel } from "@/domain/models";

export interface SendSMSPontalParams {
  number: string;
  message: string;
}

export interface UCSendSMSPontal {
  send(params: SendSMSPontalParams): Promise<SendSMSPontalModel>;
}
