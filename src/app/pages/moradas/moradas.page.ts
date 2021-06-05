import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
import { Router} from '@angular/router';
import { IonRadioGroup, NavController } from '@ionic/angular';
import { Address } from 'src/app/models/address';



@Component({
  selector: 'app-moradas',
  templateUrl: './moradas.page.html',
  styleUrls: ['./moradas.page.scss'],
})
export class MoradasPage implements OnInit {

  /**Obtém radio group buttons */
  @ViewChild("moradasRadioGroup") moradaRadioB: IonRadioGroup
  
  /**Array para lista das moradas do cliente */
  moradas: Address[];
  constructor(private ClientService:ClientService, private OrderService:OrderService,private router: Router,public nav:NavController) { }

  ngOnInit() {

    /**Obtém lista de moradas do cliente */
    this.moradas=this.ClientService.client.addresses
    console.log(this.moradas)
  }

  /**Redireciona para a pagina de adicionar uma nova morada */
  pagMorada(){

    this.router.navigate(['/adicionamorada']);
  }

  /**Obtém a morada selecionada, adicionando-a à morada destino da encomenda */
  selectMorada(){
    this.OrderService.setAddress(this.moradaRadioB.value)
    console.log(this.OrderService.order)
  }

  /**Redireciona para a página dos pagamentos */
  proximo(){
    this.router.navigate(['/pagamento']);
  }

  /**Redireciona para a página do menu */
  navigateBack(){
    this.nav.navigateBack('/menu');
  }
}
