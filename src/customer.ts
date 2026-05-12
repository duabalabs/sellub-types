import type { AppId, ChannelToken, Id } from "./primitives";

export interface CustomerRef {
  id?: Id;
  email: string;
  name?: string;
  phone?: string;
}

export interface OrderRef {
  id: Id;
  code?: string;
  channelToken?: ChannelToken;
  appId?: AppId;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled"
  | "refunded"
  | "expired";
