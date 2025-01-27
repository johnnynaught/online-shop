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
  private storageKey = 'cartItems';
  constructor(private http: HttpClient, private notificationService : NotificationService) {
    /*
    const storedItems = localStorage.getItem(this.storageKey);
    if(storedItems){
      this.cartItem = JSON.parse(storedItems);
    }
    */
    
  }

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

    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItem));
  }

  getCartItemCount(): number {
    return this.cartItem.length;
  }

  getCartItems(): Product[] {
    return this.cartItem;
  }

  removeCartItem(product: Product) : void {
    const index = this.cartItem.findIndex(item => item.id === product.id);
    if(index > -1){
      this.cartItem.splice(index, 1);
      this.notificationService.showSuccess('Item removed from cart');
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItem));
    }
  }
}
