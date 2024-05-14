
import { Component, OnInit, inject } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { CartState } from "../../store/products/products.state";
import { Observable } from "rxjs";
import { Product } from "../../../../core/models/product.interface";

import { DeleteProduct } from "../../store/products/products.actions";
@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss'
})

export class CartListComponent implements OnInit{
   
    @Select(CartState.getProducts) cartProd$ !: Observable<Product[]>;
    public data !: Product[];
    private readonly store : Store = inject( Store );

    ngOnInit(): void {
        this.cartProd$.subscribe((e) => this.data = e)
    }



    public deleteFromCart(id : number):void{
        this.store.dispatch(new DeleteProduct(id))

    }



}