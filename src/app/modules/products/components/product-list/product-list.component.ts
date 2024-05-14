import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ProductsService } from '../../services/products.service';
import { Observable, switchMap, tap } from 'rxjs';
import { Product } from '../../../../core/models/product.interface';
import { Select, Store } from '@ngxs/store';
import { CartState, ProductState } from '../../store/products/products.state';
import { GetProducts } from '../../store/products/products.actions';
import { MatDialog } from '@angular/material/dialog';
import { CartListComponent } from '../cart-list/cart-list.component';
import { PageState } from '../../store/page/page.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


  private readonly dialogService: MatDialog = inject(MatDialog);

  public activeOption: WritableSignal<string> = signal('');
  public activeProds: WritableSignal<Product[]> = signal([]);
  public loading: WritableSignal<boolean> = signal(false);

  private readonly store: Store = inject(Store);
  @Select(ProductState.getProducts) prods$ !: Observable<Product[]>;
  @Select(CartState.getLenProds) cartProds$ !: Observable<number>;
  @Select(PageState.getActive) active$ !: Observable<string>;
  @Select(ProductState.getLoader) loader$ !: Observable<boolean>;

  public itemsCart: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.cartProds$.subscribe((items) => {
      this.itemsCart.set(items)

    })

    this.loader$.subscribe((log) => this.loading.set(log))

    this.active$.subscribe({
      next: (active) => this.store.dispatch(new GetProducts(active))
    })

  }

  public openCsrt(): void {
    this.dialogService.open(CartListComponent, {

    })
  }




}
