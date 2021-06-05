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

    const url: string = "https://run.mocky.io/v3/2faa6189-3608-4144-8f5f-b6fb0643517c";

    return this.http.get<Category[]>(url, {})
      .pipe(
        map(res => {
          return res["categories"];
        })
      );
  }
}
