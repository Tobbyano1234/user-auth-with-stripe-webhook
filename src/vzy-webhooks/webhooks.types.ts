export enum StripeWebHookEvent {
  PAYMENT_SUCCEEDED = "payment_intent.succeeded",
  PAYMENT_FAILED = "payment_intent.payment_failed",
};

export type StripeWebhookData <TYPE> = {
  id: string;
  object: string;
  api_version: string;
  created: Date;
  data: {
    object: {
      id: string;
      object: string;
      application: string;
      automatic_payment_methods: string;
      cancellation_reason: string;
      client_secret: string;
      created: Date;
      customer: string;
      description: string;
      flow_directions: string;
      last_setup_error: string;
      latest_attempt: string;
      livemode: boolean;
      mandate: string;
      metadata: Record<string, any>;
      next_action: string;
      on_behalf_of: string;
      payment_method: string;
      payment_method_configuration_details: string;
      payment_method_options: {
        card: {
          mandate_options: string;
          network: string;
          request_three_d_secure: string;
        },
        us_bank_account: {
          financial_connections: {
            permissions: string[];
            prefetch: string[]
          },
          verification_method: string;
        }
      },
      payment_method_types: string[];
        single_use_mandate: string;
        status: string;
        usage: string;
    }
};
livemode: boolean;
pending_webhooks: number;
  request: {
  id: string;
    idempotency_key: string;
};
type: TYPE;
};


export type StripeSucceededCheckoutWebhookData = {
  event: StripeWebHookEvent.PAYMENT_SUCCEEDED,
  data: StripeWebhookData<"payment_intent.succeeded">
};
export type StripeFailedCheckoutWebhookData = {
  event: StripeWebHookEvent.PAYMENT_FAILED,
  data: StripeWebhookData<"payment_intent.payment_failed">
};

export type Webhook =
  | StripeSucceededCheckoutWebhookData
  | StripeFailedCheckoutWebhookData;
