import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Order, OrderState } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-buy-resume',
  templateUrl: './buy-resume.page.html',
  styleUrls: ['./buy-resume.page.scss'],
})
export class BuyResumePage implements OnInit {

  public order:Order;
  constructor(public NavController:NavController,public OrderService:OrderService) { }

  ngOnInit() {

    /***Atribui ao objeto o respectivo objeto do serviço Order, ou seja, cria uma encomenda */
    this.order = this.OrderService.order;
  }

  /**Volta para a página dos pagamentos */
  navigateBack(){
    this.NavController.navigateBack("/pagamento");
  }

  /**Redireciona para a pagina de espera da encomenda */
  confirmOrder(){
    this.NavController.navigateForward('/waiting-for-delivery');
  }
}
