export class Discount{
    public name: string;
    public discountPercent: string;
    public isActive: boolean;
    public startDate: string;
    public endDate: string;
    
    constructor(name: string, discountPercent: string, isActive: boolean,
        startDate: string, endDate: string){
            this.name = name;
            this.discountPercent = discountPercent;
            this.isActive = isActive;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}