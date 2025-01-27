import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cartItem: Product[] = [];
  constructor(private http: HttpClient, private notificationService : NotificationService) {}

  fetchProducts() : Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  addToCart(product: Product): void{
    const existingProduct = this.cartItem.find((item) => item.id === product.id);
    if(existingProduct) {
      existingProduct.quantity += 1;
      this.notificationService.showSuccess(`${product.title} already in the cart. Quantity Updated to ${existingProduct.quantity}`);
    } else {  
      product.quantity = 1;
      this.cartItem.push(product);
      this.notificationService.showSuccess(`${product.title} added to the cart`);
    }
  }

  getCartItemCount(): number {
    return this.cartItem.length;
  }
}
