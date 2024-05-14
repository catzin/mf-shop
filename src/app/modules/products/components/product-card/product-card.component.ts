import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddCartProduct } from '../../store/products/products.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product !: Product;
  private readonly router : Router = inject( Router );
  private readonly snackService : MatSnackBar = inject( MatSnackBar);
  private readonly store : Store = inject( Store);


  public addOne():void{
  
    this.product.quantityCart++;
  }

  public subOne():void{
    if(this.product.quantityCart > 0){
      this.product.quantityCart--;
    }
  }
  
  public addToCart():void{
   if(this.product.quantityCart > 0){
    this.store.dispatch(new AddCartProduct(this.product))
    this.snackService.open('Producto agregado','Ok',{
      horizontalPosition:'left',
      verticalPosition:'top',
      duration : 1 * 1000
    })
  

   }
   else{
    this.snackService.open('Elige una cantidad','Ok',{
      horizontalPosition:'center',
      verticalPosition:'bottom',
      duration : 1 * 1000
    });

   }
    
  }
  public toDetails():void{
    //this.router.navigateByUrl(`productos/details`,{id : this.product.id});
    this.router.navigate(['productos/details',this.product.id])
  }

}
