import { Component, OnInit } from '@angular/core';
import { IPaginationInfo } from '../models/pagination-info';
import { IProduct } from '../models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  paginationInfo: IPaginationInfo;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe(response =>{
      this.products = response.products;
      this.paginationInfo = response.paginationInfo;
    }, error => {
      console.log(error);
    });
  }
}
