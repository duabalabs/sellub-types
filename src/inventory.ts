import type { Cents, ChannelToken, Id } from "./primitives";

export interface InventoryItem {
  /** Stable SKU shown to the seller. */
  sku: string;
  productId?: Id;
  variantId?: Id;
  channelToken?: ChannelToken;
  /** Stock available for sale right now. */
  stockOnHand: number;
  /** Already-reserved units (e.g. in pending orders). */
  stockReserved: number;
  /** Optional restocking lead time, in days. */
  leadTimeDays?: number;
  /** Optional unit cost in minor units, used for COGS/margin reports. */
  unitCost?: Cents;
}

export interface FulfillmentLine {
  /** OrderLine id this fulfilment line refers to. */
  orderLineId: Id;
  quantity: number;
}

export type FulfillmentState =
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "failed";

/**
 * A fulfilment group for one shipment from one warehouse / seller.
 * One order may produce several FulfillmentGroups.
 */
export interface FulfillmentGroup {
  id: Id;
  state: FulfillmentState;
  method: string;
  trackingCode?: string;
  trackingUrl?: string;
  lines: FulfillmentLine[];
}
