import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { Order, OrderState } from  '../models/order';
import { Item } from  '../models/item';
import { Client } from '../models/client';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public order: Order = {client: null,items:[],address:null,state:null,deliveryTimestamp:null,orderTimestamp:null,total:null};

  constructor() {}

  public create(client:Client){
    this.order.client = client;
    this.order.state = OrderState.Pending;
  }

  public addItem(item:Item){
    this.order.items.push(item);
    this.updateTotal();
    console.log(this.order);
  }

  public removeItem(itemToDelete:Item){
    this.order.items = this.order.items.filter(item => item !== itemToDelete);
    this.updateTotal();
  }

  public setAddress(address:Address){
    this.order.address = address;
  }

  public setState(orderState:OrderState){
    this.order.state = orderState;
  }

  public setDeliveryTimeStamp(deliveryTimestamp:Date){
    this.order.deliveryTimestamp = deliveryTimestamp;
  }

  public setOrderTimestamp(orderTimestamp:Date){
    this.order.orderTimestamp = orderTimestamp;
  }

  public updateTotal(){
    let counter = 0;
    this.order.items.forEach(item =>{
      counter = counter + item.total;
    });
    console.log(counter);
    this.order.total = counter;
  }

}
