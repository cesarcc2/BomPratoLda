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
  
  /**Representa uma encomenda */
  public order: Order = {client: null,items:[],address:null,state:null,deliveryTimestamp:null,orderTimestamp:null,total:null,paymentMethod:null};

  constructor(private NavController:NavController) {}

  /**Cria uma nova encomenda de determinada cliente */
  public create(client:Client){
    this.order.client = client;
    this.order.state = OrderState.Pending;
    this.order.items = [];
    this.order.address = null;
    this.order.deliveryTimestamp = null;
    this.order.orderTimestamp = null;
    this.order.total = null;
    this.order.paymentMethod = null;
  }

  /**Adiciona uma novo item à encomenda */
  public addItem(item:Item){
    this.order.items.push(item);
    this.updateTotal();
    console.log(this.order);
  }

  /**Remove um item da encomenda */
  public removeItem(itemToDelete:Item){
    this.order.items = this.order.items.filter(item => item !== itemToDelete);
    this.updateTotal();
  }

  /**Define o destino(morada) da encomenda */
  public setAddress(address:Address){
    this.order.address = address;
  }

  /**Define o método de pagamento da encomenda */
  public setPaymentMethod(paymentMethod:string){
    this.order.paymentMethod = paymentMethod;
  }

  /**Define o estado da encomenda */
  public setState(orderState:OrderState){
    this.order.state = orderState;
  }

  /**Define a hora de entrega da encomenda */
  public setDeliveryTimeStamp(deliveryTimestamp:Date){
    this.order.deliveryTimestamp = deliveryTimestamp;
  }

  /**Define a hora da em que foi concluida a encomenda */
  public setOrderTimestamp(orderTimestamp:Date){
    this.order.orderTimestamp = orderTimestamp;
  }

  /**Atualiza o valor total da encomenda */
  public updateTotal(){
    let counter = 0;
    this.order.items.forEach(item =>{
      counter = counter + item.total;
    });
    this.order.total = counter;
  }

  public updateClient(client:Client){
    this.order.client = client;
  }

  public startOrder(){
    this.setOrderTimestamp(new Date());

    if(this.order.client.password == null){
      this.setState(OrderState.WaitingLogin);
      this.NavController.navigateForward('/login');
    }else{
      this.setState(OrderState.Processing);
      this.NavController.navigateForward('/moradas');
    }
  }

}
