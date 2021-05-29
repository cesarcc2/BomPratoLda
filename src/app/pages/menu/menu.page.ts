import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup,NavController } from '@ionic/angular';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Item } from 'src/app/models/item';
import { Order, OrderState } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AlertController } from '@ionic/angular';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('radioButtonGroup') radioButtonDeliveryTime: IonRadioGroup;
  
  public loggedIn: boolean = false;
  public items:Item[];
  public order:Order;


  public footerBodyState:FooterBodyState;
  public footerState: IonPullUpFooterState;
  public timePickerMinAndMaxTime:Array<string> = [];
  public timePickerValue:Date = null;

  constructor(private OrderService:OrderService,private NavController: NavController,public alertController: AlertController,public ClientService:ClientService) {}

  ngOnInit() {}


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout?',
      subHeader: this.OrderService.order.client.username,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.ClientService.updateClient({username:"guest",password:null,addresses:[]});
            this.OrderService.updateClient({username:"guest",password:null,addresses:[]});
            this.loggedIn = false;
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewWillEnter(){
    if(this.OrderService.order.client.password != null){
      this.loggedIn = true;
      console.log(this.OrderService.order);
    } 

    if(this.OrderService.order.state == OrderState.WaitingLogin && this.loggedIn){
      this.OrderService.startOrder();
    }

    this.footerState = IonPullUpFooterState.Collapsed;

    this.order = this.OrderService.order;
    this.items = this.order.items;

    if (this.order.items.length > 0) {
      this.footerBodyState = FooterBodyState.ShowItems;
    } else {
      this.footerBodyState = FooterBodyState.Empty;
    }
  }

  public accountButton() {
    if(this.loggedIn){
      this.presentAlertMultipleButtons();
    }else{
      this.NavController.navigateForward("/login");
    }

  }

  
  public removeItem(item: Item) {
    this.OrderService.removeItem(item);
    if (this.order.items.length === 0) {
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

  public addItemQuantity(item: Item) {
    item.quantity++;
    item.total = 0;
    item.editableIngredients.forEach(ingredient => {
      item.total = item.total + (ingredient.quantity * ingredient.unitPrice)
    });
    item.total = (item.total + item.unitPrice) * item.quantity;
    this.OrderService.updateTotal();
  }


  toggleFooter() {
    this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }


  public startOrder() {
    if (this.order.orderTimestamp == null) {
      this.footerBodyState = FooterBodyState.PickDeliveryTime;
      this.timePickerMinAndMaxTime.push(this.getMinTimePickerDate(), this.getMaxTimePickerDate());
      console.log(this.timePickerMinAndMaxTime);
    } else {
      if(this.order.orderTimestamp != null){
        this.OrderService.startOrder();
      }
    }
  }

  public getMinTimePickerDate() {
    let date = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - date)).toISOString().slice(0, -1);
  }

  public getMaxTimePickerDate() {
    let date = new Date();
    date.setHours(24, 0, 0);
    return date.toISOString();
  }

  public radioGroupChange() {
    if (this.radioButtonDeliveryTime.value == "now") {
      this.OrderService.setOrderTimestamp(new Date());
    } else {
      this.OrderService.setOrderTimestamp(this.timePickerValue);
    }
    console.log(this.order);
  }

  public timePickerChange(event) {
    this.timePickerValue = event.detail.value;
  }

  }

  export enum FooterBodyState {
    Empty = "empty",
      ShowItems = "showItems",
      PickDeliveryTime = "pickDeliveryTime"
  }
