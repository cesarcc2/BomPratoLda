import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';
import { CategoryType } from '../models/category'
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  public getItems(category): Observable<Item[]> {

    let url: string;

    switch (category) {
      case CategoryType.pizzas:
        url = "https://run.mocky.io/v3/b1a29de2-2e98-4294-b171-6771aa577557";
        break;
    
      case CategoryType.burguers:
        url = "https://run.mocky.io/v3/87e2b4fd-97b4-4b5b-be5f-c67de24869a3";
        break;
      case CategoryType.sushi:
        url = "https://run.mocky.io/v3/0b404f02-0aef-40df-a258-3103de0f0207";
        break;
      case CategoryType.beverages:
        url = "https://run.mocky.io/v3/13b311e1-468e-48b0-b65e-396d47995398";
        break;    
    }

    return this.http.get<Item[]>(url, {})
      .pipe(
        map(res => {
          return res["items"];
        })
      );
  }
}
