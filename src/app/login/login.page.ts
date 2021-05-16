import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import {Client} from '../models/client';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  clientes: any
  username: string
  password: string

  utilizadorLog: Client;

  constructor(private ClientService:ClientService,public alertController: AlertController) {
    this.ClientService.getClientes().subscribe((data) => {
      
      this.clientes=data['clients'];
      console.log(this.clientes);
    });

  }

  ngOnInit() {
  }

  /**Alerta para palavra-passe errada */
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro',
      message: 'Palavra-passe incorreta. Tenta outra vez!',
      buttons: ['OK']
    });

    await alert.present();


  }

  /***Alerta para utilizador inexistente */
  async usernameInvalido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro',
      message: `Este utilizador não existe!`,
      buttons: ['OK']
    });

    await alert.present()
  
  }

  verificaUtilizador(){

    let userLogin;
    userLogin = this.clientes.find(element => element.username === this.username)

    if (userLogin === undefined){
      //Mostrar alerta "Esse utilizador não existe!"
      this.usernameInvalido();
    } else {
      
      if (userLogin.password == this.password) {
        console.log("Login com sucesso!")
        this.utilizadorLog = userLogin
        
        //Mandar para página inicial 
        //Mandar dados do utilizador logado para a página inicial
       
      } else {
      
        console.log("Login erro")
        this.presentAlert()
        
      }

    }
    console.log(this.utilizadorLog)
  }

  

}
