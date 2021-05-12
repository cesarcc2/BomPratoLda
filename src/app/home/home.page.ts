import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ClientService:ClientService) {
    this.ClientService.getClientes().subscribe((data) => {
      console.log(data);
    });
  }

}
