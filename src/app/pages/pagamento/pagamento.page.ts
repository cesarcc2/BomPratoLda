import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { Router} from '@angular/router';
import { OrderService } from '../../services/order.service';




@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {


  
  @ViewChild("pagamentoRadioGroup") pagRadioB: IonRadioGroup

  tipoPagamento: string = null
  

  constructor(private router: Router, private OrderService: OrderService) { }

  ngOnInit() {
  }

  selectPagamento(){
    this.tipoPagamento=this.pagRadioB.value
    this.OrderService.setPaymentType(this.tipoPagamento)

  }


  sendFinalPage(){
    //Enviar para proximoa pag
    this.router.navigate(['/final']);
    
  }

 


  

}
