import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import {Client} from '../../models/client';
import { ToastController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { StorageService } from '../../services/storage.service';





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

  constructor(private ClientService:ClientService,private StorageService:StorageService,public toastController: ToastController,private router: Router) {
    this.ClientService.getClientes().subscribe((data) => {
      
      this.clientes=data['clients'];
      console.log(this.clientes);

    });

  }

  ngOnInit() {
    if(this.ClientService.client.username!="guest"){
      this.router.navigate(['/menu']);
    }

  }


  async passwordErrada() {
    const toast = await this.toastController.create({
      message: 'Palavra-passe incorreta. Tenta outra vez!!',
      duration: 2000
    });
    toast.present();
  }

  
  async usernameInvalido() {
    const toast = await this.toastController.create({
      message: 'Este utilizador não existe!',
      duration: 2000
    });
    toast.present();
  }

  verificaUtilizador(){

    if (!this.clientes.find(element => element.username === this.username)){
      //Mostrar alerta "Esse utilizador não existe!"
      this.usernameInvalido();
    } else {

      let userLogin;
        userLogin = this.clientes.find(element => element.username === this.username)
      
      if (userLogin.password == this.password) {
        console.log("Login com sucesso!")
        this.utilizadorLog = userLogin

        this.StorageService.set('username','teste')
      
        this.ClientService.updateClient({username:this.username ,password:this.password ,addresses:[]});
       
        this.router.navigate(['/menu']);

        //Coloca key-value na storage
        
      } else {
      
        console.log("Login erro")
        this.passwordErrada()
        
      }

    }
  }

  navigateToMenu(){
    this.router.navigate(['/menu']);
  }

  /**Redireciona o utilizador para a página de Registo */
  pagRegisto(){
    this.router.navigate(['/registo']);
  }

  

}
