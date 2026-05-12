import { describe, it, expect } from "vitest";
import {
  isWebhookEvent,
  type Money,
  type OrderRef,
  type PaymentRef,
  type Subscription,
  type WebhookEvent,
  type ApiResult,
  type FulfillmentGroup,
  type InventoryItem,
  type PriceQuote,
  type PlanVariant,
} from "../index";

describe("sellub-types: type shapes", () => {
  it("Money has amount + currency", () => {
    const m: Money = { amount: 1000, currency: "GHS" };
    expect(m.amount).toBe(1000);
    expect(m.currency).toBe("GHS");
  });

  it("OrderRef supports optional fields", () => {
    const o: OrderRef = { id: "ord_1", code: "ABC", channelToken: "t", appId: "duabanti" };
    expect(o.id).toBe("ord_1");
  });

  it("PriceQuote breaks down money into named legs", () => {
    const q: PriceQuote = {
      currency: "GHS",
      subtotal: 50_00,
      commission: 2_50,
      processorFee: 97,
      taxes: 0,
      total: 52_50 + 97,
      payout: 50_00 - 2_50,
      attributionSource: "marketplace",
    };
    expect(q.payout).toBe(47_50);
  });

  it("PaymentRef carries provider + state", () => {
    const p: PaymentRef = {
      id: "pay_1",
      reference: "ref_1",
      provider: "paystack",
      state: "succeeded",
      amount: 50_00,
      currency: "GHS",
    };
    expect(p.state).toBe("succeeded");
  });

  it("Subscription accepts a PlanVariant", () => {
    const v: PlanVariant = {
      code: "pro_monthly",
      name: "Pro Monthly",
      amount: 99_00,
      currency: "GHS",
      interval: "monthly",
    };
    const s: Subscription = {
      appId: "duabaconnect",
      customerEmail: "x@y.z",
      status: "paid",
      variant: v,
    };
    expect(s.variant?.interval).toBe("monthly");
  });

  it("InventoryItem + FulfillmentGroup are well-formed", () => {
    const i: InventoryItem = { sku: "SKU-1", stockOnHand: 10, stockReserved: 1 };
    const f: FulfillmentGroup = {
      id: "ful_1",
      state: "shipped",
      method: "local-courier",
      lines: [{ orderLineId: "line_1", quantity: 2 }],
    };
    expect(i.stockOnHand).toBe(10);
    expect(f.lines).toHaveLength(1);
  });

  it("ApiResult is generic over T", () => {
    const ok: ApiResult<{ x: number }> = { success: true, data: { x: 1 } };
    const fail: ApiResult<{ x: number }> = { success: false, error: { message: "nope" } };
    expect(ok.data?.x).toBe(1);
    expect(fail.error?.message).toBe("nope");
  });
});

describe("sellub-types: WebhookEvent discriminated union", () => {
  const placed: WebhookEvent = {
    id: "evt_1",
    type: "order.placed",
    createdAt: "2026-01-01T00:00:00.000Z",
    data: { order: { id: "ord_1" } },
  };

  const succeeded: WebhookEvent = {
    id: "evt_2",
    type: "payment.succeeded",
    createdAt: "2026-01-01T00:00:00.000Z",
    data: {
      payment: {
        id: "pay_1",
        reference: "ref_1",
        provider: "paystack",
        state: "succeeded",
        amount: 100,
        currency: "GHS",
      },
    },
  };

  it("isWebhookEvent narrows to the matching variant", () => {
    if (isWebhookEvent(placed, "order.placed")) {
      // type-narrowed: data.order is OrderRef
      expect(placed.data.order.id).toBe("ord_1");
    } else {
      throw new Error("expected order.placed");
    }
  });

  it("isWebhookEvent returns false for non-matching variants", () => {
    expect(isWebhookEvent(placed, "payment.succeeded")).toBe(false);
    expect(isWebhookEvent(succeeded, "payment.succeeded")).toBe(true);
  });

  it("switch-narrows on .type", () => {
    const e: WebhookEvent = succeeded;
    let captured = "";
    switch (e.type) {
      case "payment.succeeded":
        captured = e.data.payment.reference;
        break;
      default:
        captured = "other";
    }
    expect(captured).toBe("ref_1");
  });
});
