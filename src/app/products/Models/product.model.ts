import { Discount } from "./discount.model";
import { Photo } from "./photo.model";
export class Product {
    public name: string;
    public description: string;
    public totalQuantity: number;
    public price: number;
    public finalPrice: number;
    public categoryNames: string[];
    public discounts: Discount[];
    public photos: Photo[];

    constructor(name: string, description: string, 
        totalQuantity: number, price: number, 
        finalPrice: number, categoryNames: string[],
        discounts: Discount[], photos : Photo[]){
        this.name = name;
        this.description = description;
        this.totalQuantity = totalQuantity;
        this.price = price;
        this.finalPrice = finalPrice;
        this.categoryNames = categoryNames;
        this.discounts = discounts;
        this.photos = photos;
    }
}