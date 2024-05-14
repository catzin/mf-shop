import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../store/products/products.state';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{


  private readonly router : Router = inject(Router);
  private readonly activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  private store : Store = inject( Store );
  public id : WritableSignal<number> = signal(0);


  @Select(ProductState.getProducts) prod$ !: Observable<Product[]>;
  public prod !: Product;

  ngOnInit(): void {

    this.prod$.subscribe({
      next : (data) =>{
        const id : number = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
        this.prod = data.filter((e) => e.id === id)[0];
      }
    })
  }

  public toProducts():void{
    this.router.navigateByUrl('/productos')
  }

}
