import { IDiscount } from "./discount";
import { IPhoto } from "./photo";

export interface IProduct{
    name: string;
    description: string;
    totalQuantity: number;
    price: number;
    finalPrice: number;
    categoryNames: string[];
    discounts: IDiscount[];
    photos: IPhoto[];
}