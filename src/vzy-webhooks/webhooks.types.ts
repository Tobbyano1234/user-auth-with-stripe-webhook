export enum StripeWebHookEvent {
  // EXPIRED_CHECKOUT = "checkout.session.expired",
  // COMPLETED_CHECKOUT = "checkout.session.completed",
  SUCCEEDED_CHECKOUT = "checkout.session.async_payment_succeeded",
  FAILED_CHECKOUT = "checkout.session.async_payment_failed",
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

// export type StripeCompleteCheckoutWebhookData = {
//   event: StripeWebHookEvent.COMPLETED_CHECKOUT,
//   data: StripeWebhookData<"checkout.session.completed">
// };
export type StripeSucceededCheckoutWebhookData = {
  event: StripeWebHookEvent.SUCCEEDED_CHECKOUT,
  data: StripeWebhookData<"checkout.session.async_payment_succeeded">
};
export type StripeFailedCheckoutWebhookData = {
  event: StripeWebHookEvent.FAILED_CHECKOUT,
  data: StripeWebhookData<"checkout.session.async_payment_failed">
};
// export type StripeExpiredCheckoutWebhookData = {
//   event: StripeWebHookEvent.EXPIRED_CHECKOUT,
//   data: StripeWebhookData<"checkout.session.expired">
// };

export type Webhook =
  // | StripeCompleteCheckoutWebhookData
  | StripeSucceededCheckoutWebhookData
  | StripeFailedCheckoutWebhookData;
  // | StripeExpiredCheckoutWebhookData;
