import type { AppId, Id, Iso8601 } from "./primitives";
import type { OrderStatus } from "./customer";
import type { Cents, CurrencyCode } from "./primitives";

export type SubscriptionInterval =
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "biannually"
  | "annually";

/**
 * A single billable variant of a plan (e.g. "Pro Monthly" vs "Pro Yearly").
 */
export interface PlanVariant {
  /** Stable identifier exposed to integrators. */
  code: string;
  name: string;
  amount: Cents;
  currency: CurrencyCode;
  interval: SubscriptionInterval;
  /** Optional trial length in days. */
  trialDays?: number;
}

/**
 * Customer-facing subscription record. Status mirrors `OrderStatus` for
 * cross-system uniformity even though the underlying provider may use
 * different vocab.
 */
export interface Subscription {
  id?: Id;
  appId: AppId;
  customerEmail: string;
  tier?: string;
  status: OrderStatus;
  expiresAt?: Iso8601 | null;
  /** Optional currently-active plan variant. */
  variant?: PlanVariant;
}
