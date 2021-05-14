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
        url = "https://run.mocky.io/v3/af0eff42-7648-46cb-b1c2-3a7b9f7d76f9";
        break;
    
      case CategoryType.burguers:
        url = "https://run.mocky.io/v3/c2710d12-5ea4-4b08-9bc2-94771a26fb27";
        break;
      case CategoryType.sushi:
        url = "https://run.mocky.io/v3/fad69478-1ed6-46f6-b867-853393413246";
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
