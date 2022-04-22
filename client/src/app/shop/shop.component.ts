import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/categories';
import { IDiscount } from '../shared/models/discount';
import { IPaginationInfo } from '../shared/models/pagination-info';
import { IProduct } from '../shared/models/product';

import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  paginationInfo: IPaginationInfo;
  categories : ICategory[];
  discounts : IDiscount[];

  categoryIdSelected : number = 0;
  discountIdSelected : number = 0;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getDiscounts();
  }

  getProducts() {
    this.shopService
    .getProducts(this.categoryIdSelected, this.discountIdSelected)
    .subscribe(response =>{
      this.products = response.products;
      this.paginationInfo = response.paginationInfo;
    }, error => {
      this.products = []
      console.log(error);
    });
  }

  getCategories() {

    let category : ICategory = {
      id: 0, 
      name: "All", 
      description: "", 
      parentName: "", 
      childCategories: []
    };

    this.shopService.getCategories().subscribe(response => {
        this.categories = [category, ...response];
    }, error => {
      console.log(error);
    });
  }

  getDiscounts(){

    let discount : IDiscount = {
        id: 0,
        name: "All",
        discountPercent: "",
        isActive: false,
        startDate: "",
        endDate: ""
    };

    this.shopService.getDiscounts().subscribe(response => {
      this.discounts = [discount, ...response];
    }, error => {
      console.log(error);
    });
  }

  onCategorySelected(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.getProducts();
  }

  onDiscountSelected(discountId: number) {
    this.discountIdSelected = discountId;
    this.getProducts();
  }
}
