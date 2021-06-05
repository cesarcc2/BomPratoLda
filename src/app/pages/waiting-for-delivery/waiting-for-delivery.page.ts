import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { OrderState } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-waiting-for-delivery',
  templateUrl: './waiting-for-delivery.page.html',
  styleUrls: ['./waiting-for-delivery.page.scss'],
})
export class WaitingForDeliveryPage implements OnInit {

  Delivered:boolean = false;
  constructor(public loadingController: LoadingController,public orderService:OrderService,public nav:NavController) { }

  ngOnInit() {
    this.showHideAutoLoader();
  }
  
  /***Mostra alerta a indicar que o pedido está a caminho */
  showHideAutoLoader() {
    
    this.loadingController.create({
      message: 'O pedido está a caminho',
      duration: 3000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        this.Delivered = true;
      });
    });

  }

  /**Confirma a encomenda, alterando o estado da encomenda para "Entregue", e redireciona para a página do menu */
  public confirmOrder(){
    this.orderService.setState(OrderState.Delivered);
    this.orderService.create(this.orderService.order.client);
    this.nav.navigateRoot('/menu');
  }
}
