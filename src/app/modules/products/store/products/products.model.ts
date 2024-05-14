import { Product } from "../../../../core/models/product.interface";

export class ProductStateModel{
    products !: Product[];
    load !: boolean;
}

export class CartProductStateModel{
    products !: Product[];
}