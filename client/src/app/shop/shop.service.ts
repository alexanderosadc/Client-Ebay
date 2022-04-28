import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICategory } from '../shared/models/categories';
import { IDiscount } from '../shared/models/discount';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = 'https://localhost:7088/api/'

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.categoryId !== 0) {
      params = params.append('categoryId', shopParams.categoryId.toString());
    }

    if(shopParams.discountId !== 0) {
      params = params.append('discountId', shopParams.discountId.toString());
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
    .get<IPagination>(this.baseUrl + 'Products', {observe: 'response', params})
    .pipe(
        map(response => {
          return response.body;
        })
    );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'Products/' + id);
  }

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + 'Categories');
  }

  getDiscounts(){
    return this.http.get<IDiscount[]>(this.baseUrl + 'Discounts');
  }
}
