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

  @ViewChild("moradasRadioGroup") moradaRadioB: IonRadioGroup
  moradas: Address[];
  constructor(private ClientService:ClientService, private OrderService:OrderService,private router: Router,public nav:NavController) { }

  ngOnInit() {

    this.moradas=this.ClientService.client.addresses
    console.log(this.moradas)
  }

  pagMorada(){

    this.router.navigate(['/adicionamorada']);
  }

  selectMorada(){
    this.OrderService.setAddress(this.moradaRadioB.value)
    console.log(this.OrderService.order)
  }

  proximo(){
    this.router.navigate(['/pagamento']);
  }

  navigateBack(){
    this.nav.navigateBack('/menu');
  }
}
