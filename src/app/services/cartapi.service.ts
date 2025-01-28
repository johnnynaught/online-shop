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
