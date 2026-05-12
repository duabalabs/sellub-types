// Primitive scalar types used across Sellub.

/** Currency minor units (e.g. pesewas for GHS, cents for USD). */
export type Cents = number;

/** ISO 8601 timestamp string. */
export type Iso8601 = string;

/** ISO 4217 currency code, e.g. "GHS", "USD", "NGN". */
export type CurrencyCode = string;

/** Opaque identifier emitted by the Sellub server. */
export type Id = string;

/** Vendure channel token. */
export type ChannelToken = string;

/** DPS app identifier (e.g. "duabanti", "duabaconnect"). */
export type AppId = string;
