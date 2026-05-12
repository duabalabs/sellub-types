# Changelog

All notable changes to `@duabalabs/sellub-types` are documented here.

## 0.3.0 — 2026-05-12 — Inventory events

### Added

- `StockMovement`, `StockMovementType` — typed shape for inventory deltas
  (ADJUSTMENT, ALLOCATION, CANCELLATION, RELEASE, SALE, RETURN).
- `WebhookEvent` extended with four inventory event variants:
  - `inventory.updated` — `{ item: InventoryItem }`
  - `inventory.low_stock` — `{ item: InventoryItem, threshold: number }`
  - `inventory.out_of_stock` — `{ item: InventoryItem }`
  - `stock.movement` — `{ movement: StockMovement, item?: InventoryItem }`

No breaking changes — these are additive union members. Existing
discriminator switches keep working; new ones can use `isWebhookEvent(e, "inventory.updated")` etc.

## 0.2.0 — 2026-05-12

### Added

- `PriceQuote` — broken-down money quote returned by the pricing engine.
- `PaymentRef`, `PaymentMethod`, `PaymentState` — standard reference for
  real-world captures across providers.
- `PlanVariant` — billable variant of a subscription plan.
- `Subscription.variant` — optional currently-active plan variant.
- `InventoryItem`, `FulfillmentLine`, `FulfillmentGroup`, `FulfillmentState`
  — inventory and fulfilment shapes shared by server + dashboard + SDKs.
- `WebhookEvent` — discriminated union of every Sellub webhook event
  (`order.placed`, `order.state_changed`, `order.refunded`,
  `payment.succeeded`, `payment.failed`, `subscription.activated`,
  `subscription.cancelled`, `subscription.renewed`, `fulfillment.shipped`,
  `fulfillment.delivered`).
- `WebhookEventType`, `isWebhookEvent` — discriminator + type predicate.
- `ApiError` — extracted from `ApiResult` for reuse.
- `Id`, `ChannelToken`, `AppId` primitive aliases for ergonomic typing.
- Sub-path exports: `@duabalabs/sellub-types/{primitives,money,customer,
  payment,subscription,inventory,webhook,api}`.

### Changed

- Source split into modules (`primitives.ts`, `money.ts`, `customer.ts`,
  `payment.ts`, `subscription.ts`, `inventory.ts`, `webhook.ts`, `api.ts`).
  All previous exports remain available from the package root —
  `import { Money, OrderRef, Subscription } from "@duabalabs/sellub-types"`
  continues to work without changes.

### Tooling

- Added vitest test suite covering type shapes and `WebhookEvent`
  discriminator narrowing.

## 0.1.0 — 2026-04-XX

Initial release.
