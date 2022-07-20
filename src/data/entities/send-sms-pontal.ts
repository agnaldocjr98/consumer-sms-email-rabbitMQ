import { SendSMSPontalModel } from "@/domain/models";
import { SendSMSPontalParams, UCSendSMSPontal } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "@/data/interfaces";

export class SendSMSPontal implements UCSendSMSPontal {
  constructor(private readonly httpClient: HttpClient) {}
  async send(params: SendSMSPontalParams): Promise<SendSMSPontalModel> {
    const httpResponse = await this.httpClient.request({
      url: `${process.env.PONTAL_API_TRANSACTION_URI}?to=${params.number}&message=${params.message}&apikey=${process.env.PONTAL_API_KEY}`,
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: process.env.PONTAL_API_AUTHORIZATION,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return { success: true };

      default:
        return {
          success: false,
          errorMessage: `Ocorreu uma falha ao enviar o SMS pela pontal. Erro: ${JSON.stringify(
            httpResponse
          )}`,
        };
    }
  }
}
