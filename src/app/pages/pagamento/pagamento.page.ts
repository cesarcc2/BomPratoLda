import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup, NavController } from '@ionic/angular';
import { Router} from '@angular/router';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {


  
  @ViewChild("pagamentoRadioGroup") pagRadioB: IonRadioGroup

  tipoPagamento: string = null
  

  constructor(private router: Router,public OrderService:OrderService,public NavController:NavController) { }

  ngOnInit() {
  }

  selectPagamento(){
    this.tipoPagamento=this.pagRadioB.value
    this.OrderService.setPaymentMethod(this.tipoPagamento);

  }

  terminar(){
    this.NavController.navigateForward('/buy-resume');
    
  }

  navigateBack(){
    this.NavController.navigateBack('/moradas');
  }

}
