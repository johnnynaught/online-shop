import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // Backend URL
  private cartItem: Product[] = [];

  constructor(private http: HttpClient, private notificationService : NotificationService ) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
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
0  }
}
