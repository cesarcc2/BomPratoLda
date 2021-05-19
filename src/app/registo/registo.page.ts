import { Component, OnInit } from '@angular/core';
import {Client} from '../models/client';
import { ClientService } from '../services/client.service';
import { AlertController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';


//Adicionar form validation para empty inputs


@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit {


  clientes: any
  nome: string
  username: string
  password: string

  novoUtilizador = <Client>{};



  constructor(private ClientService:ClientService,public alertController: AlertController,private router: Router) { 

    this.ClientService.getClientes().subscribe((data) => {
      
      this.clientes=data['clients'];
     });

  }

  ngOnInit() {
  }

  /***Alerta para utilizador inexistente */
  async usernameExiste() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro',
      message: `Este username já existe!`,
      buttons: ['OK']
    });

    await alert.present()
  
  }

  
  /**Regista um novo utilizador no sistema.*/
  registo(){


    if (this.clientes.find(element => element.username === this.username)){
      this.usernameExiste()
    } else {
      this.novoUtilizador.username=this.username
      this.novoUtilizador.password=this.password
      this.novoUtilizador.addresses=[]
     
      this.clientes.push(this.novoUtilizador)
    }
    console.log(this.clientes)
  }

  /**Redireciona o utilizador para a página de Registo */
  pagLogin(){
    this.router.navigate(['/login']);
  }

}
