import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getCategories(): Observable<Category[]> {

    const url: string = "https://run.mocky.io/v3/330b75e8-0bf5-41dc-96d0-a1be703d3539";

    return this.http.get<Category[]>(url, {})
      .pipe(
        map(res => {
          return res["categories"];
        })
      );
  }
}
