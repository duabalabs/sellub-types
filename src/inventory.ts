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

/**
 * Why a stock movement happened. Mirrors Vendure's `StockMovementType`.
 */
export type StockMovementType =
  | "ADJUSTMENT"
  | "ALLOCATION"
  | "CANCELLATION"
  | "RELEASE"
  | "SALE"
  | "RETURN";

/**
 * One change in available stock for a single SKU/variant. Negative
 * `quantity` means stock decreased (e.g. SALE / ALLOCATION).
 */
export interface StockMovement {
  id: Id;
  sku: string;
  variantId?: Id;
  productId?: Id;
  type: StockMovementType;
  /** Signed delta. Negative for outflows, positive for inflows. */
  quantity: number;
  /** Order this movement is tied to, if any. */
  orderId?: Id;
  orderCode?: string;
  /** Stock location id, if the seller has multiple warehouses. */
  locationId?: Id;
  /** Free-form note from the operator who made the adjustment. */
  notes?: string;
  /** When the movement occurred (ISO 8601). */
  occurredAt?: string;
}
