import { Item } from './item';
import { Client } from './client';
import { Address } from './address';

export interface Order {
    client: Client,
    items: Item[],
    total: number,
    orderTimestamp: Date,
    deliveryTimestamp: Date,
    state: OrderState,
    address: Address
}

export enum OrderState {
    Pending  = "pending",
    Processing   = "processing",
    Delivered  = "delivered"
}