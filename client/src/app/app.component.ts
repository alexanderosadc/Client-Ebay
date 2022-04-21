import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';
import { IPaginationInfo } from './models/pagination-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  products: IProduct[];
  paginationInfo: IPaginationInfo;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    console.log("asfjkasfjsak");
    this.http.get('https://localhost:7088/apiProduct/')
    .subscribe((response: IPagination) => {
      this.products = response.products;
      this.paginationInfo = response.paginationInfo;
    }, error? =>{
      console.log(error);
    });
  }
}
