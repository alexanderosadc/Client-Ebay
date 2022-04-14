export class Photo{
    public name: string;
    public binaryData : number;

    constructor(name: string, binaryData: number){
        this.name = name;
        this.binaryData = binaryData;
    }
}