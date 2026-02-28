import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  constructor() { }

  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  addToCart(productId: number): void {
    const currentCount = this.cartItemCountSubject.value;
    this.cartItemCountSubject.next(currentCount + 1);
  }

  removeFromCart(): void {
    const currentCount = this.cartItemCountSubject.value;
    if (currentCount > 0) {
      this.cartItemCountSubject.next(currentCount - 1);
    }
  }
}
