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
        url = "https://run.mocky.io/v3/498d840c-136f-41f4-acaf-a991b2f061a7";
        break;
    
      case CategoryType.burguers:
        url = "https://run.mocky.io/v3/87e2b4fd-97b4-4b5b-be5f-c67de24869a3";
        break;
      case CategoryType.sushi:
        url = "https://run.mocky.io/v3/0b404f02-0aef-40df-a258-3103de0f0207";
        break;
      case CategoryType.beverages:
        url = "https://run.mocky.io/v3/2f7f6b26-088b-40b1-984d-6fb1bc27274a";
        break;    
    }

    let items: Item[] = [];
    return this.http.get<Item[]>(url, {})
      .pipe(
        map(res => {
          res['items'].forEach(item => {
            item.quantity = 1;
            items.push(item);
          });
          
          return items;
        })
      );
  }
}
