import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router} from '@angular/router';
import {Order,OrderState} from '../../models/order';

import { AlertController } from '@ionic/angular';





@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {

  order: Order

  constructor(private OrderService:OrderService, private router: Router,public alertController: AlertController) { }

  ngOnInit() {

    this.order=this.OrderService.order
    console.log(this.order)
  }

  async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'A sua encomenda foi processada com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/']);
         }
        }
      ]
      
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss()
    console.log('onDidDismiss resolved with role', role);
  }

  finish(){
    /**Altera o estado do pedido para "A processar" */
    this.OrderService.setState(OrderState.Processing)
    this.showAlert()
}





}
