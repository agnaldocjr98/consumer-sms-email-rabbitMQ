import { SendSMSPontalModel } from "@/domain/models";
import { SendSMSPontalParams } from "@/domain/usecases";

export interface SendSMSPontalInterface {
  send(params: SendSMSPontalParams): Promise<SendSMSPontalModel>;
}
