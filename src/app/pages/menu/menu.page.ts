import { Component, OnInit } from '@angular/core';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public footerState: IonPullUpFooterState;

  public items:Item[];
  public order:Order;

  constructor(private OrderService:OrderService) {
    this.order = this.OrderService.order;
    this.items = this.order.items;
  }

  ngOnInit() {
    this.footerState = IonPullUpFooterState.Collapsed;
  }

  public removeItem(item:Item){
    this.OrderService.removeItem(item);
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

  toggleFooter() {
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  public navigateToAccountPage() {

  }
}
