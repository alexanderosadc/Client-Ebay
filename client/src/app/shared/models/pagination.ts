import { IPaginationInfo } from "./pagination-info";
import { IProduct } from "./product";

export interface IPagination {
    products: IProduct[];
    paginationInfo: IPaginationInfo;
}