import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';  
import { ProductPage } from './Models/product-page.model';
import { map } from 'rxjs/operators';
import { PaginationInfo } from './Models/pagination-info.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productPage: ProductPage;
  currentPageNumber: number = 1;

  constructor(private httpService: HttpClient) { 
    this.productPage = new ProductPage();
  }
  
  ngOnInit(): void {
    
    
    //let result = this.getProducts(this.currentPageNumber.toString());
    let result = this.getPaginationInfo(this.currentPageNumber.toString())
    .subscribe(responseData =>{
      console.log(responseData.products);
    });
    //console.log(result);
  }

  getPaginationInfo(currentPageNumber: string) : Observable<ProductPage> {
    const headers = new HttpHeaders().set("currentPageNumber", currentPageNumber);

    return this.httpService
    .get<ProductPage>("https://localhost:7088/apiProduct/", {headers});
  }
  getProducts(currentPageNumber: string){
    const headers = new HttpHeaders().set("currentPageNumber", currentPageNumber);
    

    return this.httpService
    .get('https://localhost:7088/apiProduct/', {headers})
    .pipe(
      map(
        data => {
          console.log(data);
          let parsedObject = JSON.parse(data.toString());
          let obtainedPaginationInfo = new ProductPage();
          
          return obtainedPaginationInfo;
        }
      )
    )
    .subscribe(responseData =>
      {
        this.productPage = responseData;
        console.log(responseData);
        //this.productPage = new ProductPage(responseData.productViewsDTO);
      });
  }
}
