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


  /**Obtém o grupo de radiobuttons */
  @ViewChild("pagamentoRadioGroup") pagRadioB: IonRadioGroup

  /**Tipo de pagamento("Multibanco,MBway...") */
  tipoPagamento: string = null
  

  constructor(private router: Router,public OrderService:OrderService,public NavController:NavController) { }

  ngOnInit() {
  }

  /**Obtém o valor do tipo de pagamento selecionado pelo radio button, adicionando esse método à encomenda*/
  selectPagamento(){
    this.tipoPagamento=this.pagRadioB.value
    this.OrderService.setPaymentMethod(this.tipoPagamento);

  }

  /**Redireciona para a página final da encomenda(informações da encomenda) */
  terminar(){
    this.NavController.navigateForward('/buy-resume');
    
  }

  /**Volta para a página as moradas */
  navigateBack(){
    this.NavController.navigateBack('/moradas');
  }

}
