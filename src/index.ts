// @duabalabs/sellub-types
// Shared types for the Sellub commerce platform.
//
// All exports are re-exported from sub-modules; importing from the package
// root works exactly as it did in 0.1.x:
//
//   import type { Money, OrderRef, Subscription } from "@duabalabs/sellub-types";
//
// You can also import from a sub-path for tree-shaking-friendly bundlers:
//
//   import type { WebhookEvent } from "@duabalabs/sellub-types/webhook";

export * from "./primitives";
export * from "./money";
export * from "./customer";
export * from "./payment";
export * from "./subscription";
export * from "./inventory";
export * from "./webhook";
export * from "./api";
// @duabalabs/sellub-types
// Shared types for the Sellub commerce platform.

export type Cents = number;
export type Iso8601 = string;
export type CurrencyCode = string;

export interface Money {
  amount: Cents;
  currency: CurrencyCode;
}

export interface CustomerRef {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
}

export interface OrderRef {
  id: string;
  code?: string;
  channelToken?: string;
  appId?: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled"
  | "refunded"
  | "expired";

export interface Subscription {
  id?: string;
  appId: string;
  customerEmail: string;
  tier?: string;
  status: OrderStatus;
  expiresAt?: Iso8601 | null;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: { code?: string | number; message: string };
}
