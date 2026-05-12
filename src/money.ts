import type { Cents, CurrencyCode } from "./primitives";

export interface Money {
  amount: Cents;
  currency: CurrencyCode;
}

/**
 * A price quote returned by the pricing engine, broken down so callers can
 * display each leg (subtotal, commission, processor fees) separately.
 *
 * All amounts are in minor units of `currency`.
 */
export interface PriceQuote {
  currency: CurrencyCode;
  subtotal: Cents;
  commission: Cents;
  processorFee: Cents;
  taxes: Cents;
  total: Cents;
  /** What the seller receives after all deductions. */
  payout: Cents;
  /**
   * Optional attribution source that drove rate selection
   * (e.g. "marketplace", "custom_domain", "embed").
   */
  attributionSource?: string;
}
