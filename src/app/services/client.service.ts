import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

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
}
