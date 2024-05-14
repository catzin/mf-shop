import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsPageComponent } from "./products-page.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { DetailsComponent } from "./components/details/details.component";


const routes : Routes = [
      {
        path:'',
        component : ProductsPageComponent,
        children:[
    
          {
            path:'',
            redirectTo:'list',
            pathMatch:'full'
          },
          {
            path:'list',
            component : ProductListComponent
          },
          {
            path:'details/:id',
            component:DetailsComponent
          }
          
        ]
      },
      
     
    ];


@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class ProductsRoutingModule{}