import { Component } from '@angular/core';
import { ClientService } from './services/client.service';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private ClientService:ClientService,private OrderService:OrderService) {
    OrderService.create(ClientService.setGuestAccount());
  }
}
