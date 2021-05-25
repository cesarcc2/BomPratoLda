import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Address } from '../models/address';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public client: Client = {addresses:null,password:null,username:"guest"};

  constructor(private http:HttpClient) { }

  /**Obter a lista dos clientes */
  getClientes() {
    return new Observable (observer => {
      fetch('https://run.mocky.io/v3/1adc4a85-3181-4653-a899-7efe454056f7')
      .then(resposta => resposta.json())
      .then(json => {
        observer.next(json);
        observer.complete();
      });
    })
  }

  /**Atualiza o cliente */
  updateClient(client: Client){
    this.client = client
  }

  /**Adiciona uma nova morada ao array das moradas do cliente */
  addAddress(address: Address){
    this.client.addresses=[]
    this.client.addresses.push(address)
  }
}
