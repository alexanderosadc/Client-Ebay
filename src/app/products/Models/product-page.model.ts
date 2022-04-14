import { PaginationInfo } from "./pagination-info.model";
import { Product } from "./product.model";

export class ProductPage {
    products: Product[] = [];
    paginationInfo: PaginationInfo;
    
    // constructor(data: any = null)
    // {
    //    this.paginationInfo = = new PaginationInfo();
    // }

    constructor()
    {
        this.paginationInfo = new PaginationInfo();
    }
}