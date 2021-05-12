import { Item } from './item';
import { Client } from './client';

export interface Order {
    client: Client,
    items: Item[],
    total: number,
    orderTimestamp: Date,
    deliveryTimestamp: Date,
    state: OrderState
}

enum OrderState {
    Pending  = "pending",
    Processing   = "processing",
    Delivered  = "delivered"
}