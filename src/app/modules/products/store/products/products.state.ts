import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { CartProductStateModel, ProductStateModel } from "./products.model";
import { Product } from "../../../../core/models/product.interface";
import { AddCartProduct, DeleteProduct, GetDetails, GetProducts } from "./products.actions";
import { ProductsService } from "../../services/products.service";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";



@State<ProductStateModel>({
    name: 'product',
    defaults: {
        products: [],
        load : true
    }
})

@Injectable()
export class ProductState {

    constructor(private readonly proudctService: ProductsService) { }


    @Selector()
    static getLoader(state : ProductStateModel):boolean{
        return state.load;
    }

   

    @Selector()
    static getProducts(state: ProductStateModel): Product[] {
        return state.products
    }


    @Action(GetProducts)
    public getProducts({ getState, patchState }: StateContext<ProductStateModel>, { payload }: GetProducts) {

        return this.proudctService.getProductsByCategory(payload).pipe(
            tap((prod: Product[]) => {

                prod?.forEach((e) => {
                    e.quantityCart = 0
                })
                const state = getState();
                patchState({
                    ...state,
                    products: prod,
                    load : false
                })
            })
        )
    }
}

@State<CartProductStateModel>({
    name: 'cart',
    defaults: {
        products: []
    }
})

@Injectable()
export class CartState {

    @Selector()
    static getProducts(state: CartProductStateModel): Product[] {
        return state.products;
    }

    @Selector()
    static getLenProds(state: CartProductStateModel): number {
        return state.products.length;
    }

    @Action(DeleteProduct)
    public deleteProduct({getState , patchState} : StateContext<CartProductStateModel> , { payload } : DeleteProduct){
        const state = getState();

        patchState({
            ...state,
            products : state.products.filter((e) => e.id !== payload)
        })
    }

    @Action(AddCartProduct)
    public addProductToCart({ getState, patchState }: StateContext<CartProductStateModel>, { payload }: AddCartProduct) {
        const state = getState();
      
        if (!state.products.includes(payload)) {
            patchState({
                ...state,
                products: [...state.products, payload]
            })
            
        }
       
    }
}