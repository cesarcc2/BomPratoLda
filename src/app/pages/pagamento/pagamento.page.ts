import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { Router} from '@angular/router';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {


  
  @ViewChild("pagamentoRadioGroup") pagRadioB: IonRadioGroup

  tipoPagamento: any
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectPagamento(){
    this.tipoPagamento=this.pagRadioB.value
    console.log(this.tipoPagamento)

  }

  terminar(){
    //Enviar para proximoa pag
    
  }

  

}
