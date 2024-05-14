import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    redirectTo:'productos',
    pathMatch:'full'
  },

  {
    path:'productos',
    loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
