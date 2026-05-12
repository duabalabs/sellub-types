import type { Cents, CurrencyCode, Id, Iso8601 } from "./primitives";

export type PaymentMethod =
  | "card"
  | "bank_transfer"
  | "mobile_money"
  | "ussd"
  | "qr"
  | "wallet"
  | "manual"
  | "other";

export type PaymentState =
  | "initialized"
  | "pending"
  | "succeeded"
  | "failed"
  | "abandoned"
  | "refunded";

/**
 * A reference to a real-world payment captured against an order or
 * subscription. Mirrors what Sellub stores server-side for reconciliation.
 */
export interface PaymentRef {
  id: Id;
  /** Provider-side reference (e.g. Paystack reference). */
  reference: string;
  provider: "paystack" | "manual" | "other";
  method?: PaymentMethod;
  state: PaymentState;
  amount: Cents;
  currency: CurrencyCode;
  paidAt?: Iso8601;
  /** Optional 4-digit last digits / mobile-money MSISDN tail for display. */
  last4?: string;
}
