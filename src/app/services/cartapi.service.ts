import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { ShoppingCartDto } from '../models/ShoppingCart';

@Injectable({
  providedIn: 'root',
})
export class CartapiService {
  private cartApiUrl = 'http://54.84.96.95:8080/api/carts'; // Backend Cart API URL
  private cartCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.loadCartItemCount(); // Load initial count when the service starts
  }

  // Load initial cart count from backend
  private loadCartItemCount(): void {
    this.http.get<number>(`${this.cartApiUrl}/count`).subscribe({
      next: (count) => this.cartCount.next(count),
      error: (err) => console.error('Error fetching cart item count:', err),
    });
  }

  // Get real-time cart count
  getCartItemCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  // Get all cart items
  getCartItems(): Observable<ShoppingCartDto[]> {
    return this.http.get<ShoppingCartDto[]>(`${this.cartApiUrl}`);
  }

  // Add or update a product in the cart
  addProductToCart(cartDto: ShoppingCartDto): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.post(`${this.cartApiUrl}/add`, cartDto).subscribe({
        next: () => {
          this.notificationService.showSuccess(`${cartDto.title} added to the cart.`);
          observer.next(); // Notify success
          observer.complete();
        },
        error: (err) => {
          const errorMsg = err.error?.message || `Failed to add ${cartDto.title} to the cart.`;
          this.notificationService.showError(errorMsg);
          observer.error(err); // Notify failure
        },
      });
    });
  }

  // Remove a product from the cart by productId
  removeCartItem(productId: number): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.delete(`${this.cartApiUrl}/${productId}`).subscribe({
        next: () => {
          this.notificationService.showSuccess(`Item removed from the cart.`);
          observer.next(); // Notify success
          observer.complete();
        },
        error: (err) => {
          const errorMsg = err.error?.message || `Failed to remove item from the cart.`;
          this.notificationService.showError(errorMsg);
          observer.error(err); // Notify failure
        },
      });
    });
  }

  // Get the total amount in the cart
  getTotalAmount(): Observable<number> {
    return this.http.get<number>(`${this.cartApiUrl}/total`);
  }

}
