import { Component, OnInit } from '@angular/core';
import {Client} from '../models/client';
import {Address} from '../models/address';
import { ClientService } from '../services/client.service';
import { Validators, FormBuilder, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';




@Component({
  selector: 'app-adicionamorada',
  templateUrl: './adicionamorada.page.html',
  styleUrls: ['./adicionamorada.page.scss'],
})
export class AdicionamoradaPage implements OnInit {

  form: FormGroup;
  submitted = false;

  //morada = <Address>{};

  constructor(private ClientService:ClientService, public formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
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

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      this.adicionarMorada()
      
    }
  }
  
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
}
