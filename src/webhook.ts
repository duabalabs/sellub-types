import type { Id, Iso8601 } from "./primitives";
import type { OrderRef, OrderStatus } from "./customer";
import type { PaymentRef } from "./payment";
import type { Subscription } from "./subscription";
import type { FulfillmentGroup, InventoryItem, StockMovement } from "./inventory";

/** Discriminator keys for the typed webhook union. */
export type WebhookEventType =
  | "order.placed"
  | "order.state_changed"
  | "order.refunded"
  | "payment.succeeded"
  | "payment.failed"
  | "subscription.activated"
  | "subscription.cancelled"
  | "subscription.renewed"
  | "fulfillment.shipped"
  | "fulfillment.delivered"
  | "inventory.updated"
  | "inventory.low_stock"
  | "inventory.out_of_stock"
  | "stock.movement";

interface WebhookEventBase<TType extends WebhookEventType, TData> {
  /** Server-assigned event id; use to deduplicate redeliveries. */
  id: Id;
  type: TType;
  /** Event creation timestamp, ISO 8601. */
  createdAt: Iso8601;
  /** Sellub API version that produced the event. */
  apiVersion?: string;
  data: TData;
}

export type OrderPlacedEvent = WebhookEventBase<
  "order.placed",
  { order: OrderRef }
>;

export type OrderStateChangedEvent = WebhookEventBase<
  "order.state_changed",
  { order: OrderRef; from: OrderStatus; to: OrderStatus }
>;

export type OrderRefundedEvent = WebhookEventBase<
  "order.refunded",
  { order: OrderRef; refundedAmount: number; reason?: string }
>;

export type PaymentSucceededEvent = WebhookEventBase<
  "payment.succeeded",
  { order?: OrderRef; payment: PaymentRef }
>;

export type PaymentFailedEvent = WebhookEventBase<
  "payment.failed",
  { order?: OrderRef; payment: PaymentRef; reason?: string }
>;

export type SubscriptionActivatedEvent = WebhookEventBase<
  "subscription.activated",
  { subscription: Subscription }
>;

export type SubscriptionCancelledEvent = WebhookEventBase<
  "subscription.cancelled",
  { subscription: Subscription; reason?: string }
>;

export type SubscriptionRenewedEvent = WebhookEventBase<
  "subscription.renewed",
  { subscription: Subscription; payment?: PaymentRef }
>;

export type FulfillmentShippedEvent = WebhookEventBase<
  "fulfillment.shipped",
  { order: OrderRef; fulfillment: FulfillmentGroup }
>;

export type FulfillmentDeliveredEvent = WebhookEventBase<
  "fulfillment.delivered",
  { order: OrderRef; fulfillment: FulfillmentGroup }
>;

export type InventoryUpdatedEvent = WebhookEventBase<
  "inventory.updated",
  { item: InventoryItem }
>;

export type InventoryLowStockEvent = WebhookEventBase<
  "inventory.low_stock",
  { item: InventoryItem; threshold: number }
>;

export type InventoryOutOfStockEvent = WebhookEventBase<
  "inventory.out_of_stock",
  { item: InventoryItem }
>;

export type StockMovementEvent = WebhookEventBase<
  "stock.movement",
  { movement: StockMovement; item?: InventoryItem }
>;

/**
 * Discriminated union of every Sellub webhook event. Switch on `event.type`
 * to narrow `event.data`.
 */
export type WebhookEvent =
  | OrderPlacedEvent
  | OrderStateChangedEvent
  | OrderRefundedEvent
  | PaymentSucceededEvent
  | PaymentFailedEvent
  | SubscriptionActivatedEvent
  | SubscriptionCancelledEvent
  | SubscriptionRenewedEvent
  | FulfillmentShippedEvent
  | FulfillmentDeliveredEvent
  | InventoryUpdatedEvent
  | InventoryLowStockEvent
  | InventoryOutOfStockEvent
  | StockMovementEvent;

/** Type predicate for a specific event type. */
export function isWebhookEvent<T extends WebhookEventType>(
  event: WebhookEvent,
  type: T,
): event is Extract<WebhookEvent, { type: T }> {
  return event.type === type;
}
