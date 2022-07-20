export interface SendSMSEmailConsumerParams {
  key: string;
  type: "E" | "S";
  content: string;
  errorMessage?: string;
  partner?: "PT" | "PG";
}

export interface UCSendSMSEmailConsumer {
  consume(): Promise<void>;
}
