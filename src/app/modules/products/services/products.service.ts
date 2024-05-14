import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http : HttpClient) { }

  public getAllCategories():Observable<string[]>{
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  public getProductsByCategory(category : string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);

  }
}
