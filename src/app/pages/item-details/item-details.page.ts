import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonPullUpFooterState} from 'ionic-pullup';

import { Ingredient } from 'src/app/models/ingredient';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})

export class ItemDetailsPage implements OnInit {

  public order:Order;
  public item:Item;

  public footerBodyState:FooterBodyState;
  footerState: IonPullUpFooterState;
  timePickerMinAndMaxTime:Array<string> = [];

  constructor(private router: Router,private OrderService:OrderService,private NavController:NavController) {
    if (router.getCurrentNavigation().extras.state) {
      const item = this.router.getCurrentNavigation().extras.state["item"];
    this.item = item;
    this.item.total = this.item.unitPrice;
    }
    this.order = this.OrderService.order;
    if(this.order.items.length > 0){
      this.footerBodyState = FooterBodyState.ShowItems;
    }else{
      this.footerBodyState = FooterBodyState.Empty;
    }
  }

  ngOnInit() {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  public addItem(item:Item){
    this.OrderService.addItem(JSON.parse(JSON.stringify(item)));
    this.footerBodyState = FooterBodyState.ShowItems;
  }

  public removeItem(item:Item){
    this.OrderService.removeItem(item);
    if(this.order.items.length === 0){
      this.footerBodyState = FooterBodyState.Empty;
    }
  }

  public removeItemQuantity(item: Item) {
    if (item.quantity > 1) {
      item.quantity--;

      item.total = 0;
      item.editableIngredients.forEach(ingredient => {
        item.total = item.total + (ingredient.quantity * ingredient.unitPrice)
      });
      item.total = (item.total + item.unitPrice) * item.quantity;
      this.OrderService.updateTotal();
    }
  }

  public addItemQuantity(item:Item){
    item.quantity++;
    item.total = 0;
    item.editableIngredients.forEach(ingredient=>{
      item.total = item.total + (ingredient.quantity * ingredient.unitPrice)
    });
    item.total = (item.total + item.unitPrice) * item.quantity;
    this.OrderService.updateTotal();
  }

  public addIngredientQuantity(item:Item,ingredient:Ingredient){
    item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity++;
    item.total = item.total + ingredient.unitPrice;
  }

  public removeIngredientQuantity(item:Item,ingredient:Ingredient){
    if(item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity > 0){
      item.editableIngredients[item.editableIngredients.indexOf(ingredient)].quantity--;
      item.total = item.total - ingredient.unitPrice;
    }
    
  }

  toggleFooter() {
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  public navigateToAccountPage(){

  }

  public startOrder(){
    if(this.order.orderTimestamp == null){
    this.footerBodyState = FooterBodyState.PickDeliveryTime;
    this.timePickerMinAndMaxTime.push(this.getMinTimePickerDate(),this.getMaxTimePickerDate());
    console.log(this.timePickerMinAndMaxTime);
    }else{
    this.OrderService.startOrder();
    }

  }

  public getMinTimePickerDate(){
    let date = new Date();
    return date.toISOString();
  }

  public getMaxTimePickerDate(){
    let date = new Date();
    date.setHours(23,0,0);
    return date.toISOString();
  }

  public navigateBack(){
    console.log("A");
    this.NavController.navigateBack('/menu');
  }
}

export enum FooterBodyState {
  Empty = "empty",
  ShowItems = "showItems",
  PickDeliveryTime = "pickDeliveryTime"
}