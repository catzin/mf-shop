import { Product } from "../../../../core/models/product.interface";

export class GetProducts{
    static readonly type = '[Products] Get Products';
    constructor(public payload : string){}
}

export class GetDetails{
    static readonly type = '[Products] Get Details';
    constructor(public payload : number){} 
}

export class AddCartProduct{
    static readonly type = '[Cart] Add Product';
    constructor(public payload : Product){}
}

export class DeleteProduct{
    static readonly type = '[Cart] Delete Product';
    constructor(public payload : number){}
}