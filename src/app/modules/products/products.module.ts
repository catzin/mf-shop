import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DetailsComponent } from './components/details/details.component';
import { ProductsRoutingModule } from './products-page.routing.module';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxsModule } from '@ngxs/store';
import { CartState, ProductState } from './store/products/products.state';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { CartListComponent } from './components/cart-list/cart-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PageState } from './store/page/page.state';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductCardComponent,
    ProductListComponent,
    DetailsComponent,
    CartListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ProductsRoutingModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxsModule.forFeature([ProductState,CartState,PageState]),
    
  
  ],
 
})
export class ProductsModule { }
