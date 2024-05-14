import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SidenavStateModel } from "./page.model";
import { Injectable } from "@angular/core";
import { SideNav } from "../../../../core/models/sidenav.interface";
import { GetCategories, SetLoading, UpdateActive } from "./page.action";
import { ProductsService } from "../../services/products.service";
import { tap } from "rxjs";


@State<SidenavStateModel>({
    name: 'sidenav',
    defaults: {
        data: {
            categories: [],
            load: true,
            active: ''
        }
    }
})

@Injectable()
export class PageState {

    constructor(private readonly productService: ProductsService) { }

    @Selector()
    static getData(state: SidenavStateModel): SideNav {
        return state.data
    }

    @Selector()
    static getActive(state: SidenavStateModel): string {
        return state.data.active;
    }

    @Action(UpdateActive)
    public setActive({getState, patchState} : StateContext<SidenavStateModel> , {payload} : UpdateActive){
        const state = getState();
        patchState({
            ...state,
            data:{
                ...state.data,
                active : payload
              
            }
        })
    }
    @Action(SetLoading)
    public setLoading({ getState, patchState }: StateContext<SidenavStateModel>, { payload }: SetLoading) {
        const state = getState();
        patchState({
            ...state,
            data: {
                ...state.data,
                load: false,
                categories: [...state.data.categories]

            }
        })
    }

    @Action(GetCategories)
    public getProducts({ getState, patchState }: StateContext<SidenavStateModel>) {
        return this.productService.getAllCategories().pipe(
            tap((cate: string[]) => {
                const state = getState();

                patchState({
                    ...state,
                    data: {
                        categories: cate,
                        load: false,
                        active: cate[0]
                    }
                })
            })
        )
    }

}