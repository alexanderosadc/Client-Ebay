import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICategory } from '../shared/models/categories';
import { IDiscount } from '../shared/models/discount';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = 'https://localhost:7088/api/'

  constructor(private http: HttpClient) { }

  getProducts(categoryId?: number, discountId?:number) {
    let params = new HttpParams();

    if(categoryId) {
      params = params.append('categoryId', categoryId.toString());
    }

    if(discountId) {
      params = params.append('discountId', discountId.toString());
    }

    return this.http
    .get<IPagination>(this.baseUrl + 'Products', {observe: 'response', params})
    .pipe(
        map(response => {
          return response.body;
        })
    );
  }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'Categories');
  }

  getDiscounts(){
    return this.http.get<IDiscount[]>(this.baseUrl + 'Discounts');
  }
}
