import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import { ClientService } from '../../services/client.service';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage.service';




//Adicionar form validation para empty inputs


@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit {


  clientes: any


  novoUtilizador = <Client>{};

  myForm: FormGroup;
  submitted = false;



  constructor(private ClientService:ClientService,public toastController: ToastController,private router: Router, public formBuilder: FormBuilder,private StorageService:StorageService) { 

    //tirar
    this.ClientService.getClientes().subscribe((data) => {
      
      this.clientes=data['clients'];
     });

  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  /***Alerta para utilizador inexistente */
  async usernameExiste() {
    const toast = await this.toastController.create({
      message: 'Este username já existe!',
      duration: 2000
    });
    toast.present();
  }

  
  /**Regista um novo utilizador no sistema.*/
  registo(){


    if (this.clientes.find(element => element.username === this.myForm.value.username)){
      this.usernameExiste()
    } else {
      
      let client: Client = {
        username: this.myForm.value.username,
        password: this.myForm.value.password,
        addresses: []
        }

      
      this.ClientService.updateClient(client)

      this.StorageService.set('username',client.username)
        
      this.StorageService.get('username').then(
        data => {
          console.log(data)
        }
      )

      this.router.navigate(['/menu']);
    }
  
  }

  /**Redireciona o utilizador para a página de Registo */
  pagLogin(){
    this.router.navigate(['/login']);
  }

  get errorCtr() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
      return false;
    } else {
      this.registo()
    }
  }

}
