import { Component, OnInit } from '@angular/core';
import {Address} from '../../models/address';
import { ClientService } from '../../services/client.service';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-adicionamorada',
  templateUrl: './adicionamorada.page.html',
  styleUrls: ['./adicionamorada.page.scss'],
})
export class AdicionamoradaPage implements OnInit {

  form: FormGroup;
  submitted = false;

  //morada = <Address>{};

  constructor(private ClientService:ClientService, public formBuilder: FormBuilder,private router: Router,public Nav:NavController) { }

  ngOnInit() {

    /***Define parâmetros para os form validators */
    this.form = this.formBuilder.group({
      rua: ['', [Validators.required]],
      porta: ['', [Validators.required]],
      piso: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      codpostal: ['', [Validators.required,Validators.pattern('^[0-9_-]{4}-[0-9_-]{3}$')]]

    })
  }

  get errorCtr() {
    return this.form.controls;
  }

  /***Caso o formulário tenha os parâmetro corretos, a função "adicionarMorada" é executada.*/
  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      this.adicionarMorada()
      
    }
  }
  
  /***Cria um objeto com os valores dos campos do formulário, e adiciona-o à lista das moradas do cliente, através do serviço.
   * Posteriormente, redireciona para a página da lista das moradas.
  */
  adicionarMorada(){
  
    let morada: Address = {
      street: this.form.value.rua,
      doorNumber: this.form.value.porta,
      floor: this.form.value.piso,
      postalCode: this.form.value.codpostal,
      city: this.form.value.cidade
    }


    this.ClientService.addAddress(morada)
    
    console.log(this.ClientService.client)

    this.router.navigate(['/moradas']);


  }

  /***Volta para a página das moradas */
  navigateBack(){
    this.Nav.navigateBack('/moradas');
  }
}
