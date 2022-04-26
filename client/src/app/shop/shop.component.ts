import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/categories';
import { IDiscount } from '../shared/models/discount';
import { IPaginationInfo } from '../shared/models/pagination-info';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';

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
  shopParams : ShopParams = new ShopParams();
  totalCount : number;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getDiscounts();
  }

  getProducts() {
    this.shopService
    .getProducts(this.shopParams)
    .subscribe(response =>{
      this.products = response.products;
      this.shopParams.pageNumber = response.paginationInfo.currentPage;
      this.shopParams.pageSize = response.paginationInfo.itemsPerPage;
      this.totalCount = response.paginationInfo.totalItems;
      console.log(response.paginationInfo.totalPages);
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
    this.shopParams.categoryId = categoryId;
    this.getProducts();
  }

  onDiscountSelected(discountId: number) {
    this.shopParams.discountId = discountId;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }
}
