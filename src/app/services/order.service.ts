import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { Order, OrderState } from  '../models/order';
import { Item } from  '../models/item';
import { Client } from '../models/client';
import { Address } from '../models/address';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  public order: Order = {client: null,items:[],address:null,state:null,deliveryTimestamp:null,orderTimestamp:null,total:null,paymentType:null};

  constructor(private NavController:NavController) {}

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

  public setPaymentType(type: string){
    this.order.paymentType = type;
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
    this.order.total = counter;
  }

  public startOrder(){
    this.setOrderTimestamp(new Date());
    if(this.order.client.password == null){
      this.NavController.navigateForward('/login');
    }else{
      this.NavController.navigateForward('/PickAddress');
    }
  }

}
