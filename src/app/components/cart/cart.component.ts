import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { CartapiService } from '../../services/cartapi.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems : Product[] = [];
  totalAmount : number = 0;

  constructor(private cartApi: CartapiService) {}

  ngOnInit() {
    this.cartItems = this.cartApi.getCartItems();
    this.calculateTotalAmount();
  }

  calculateTotalAmount(){
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(product: Product){
    this.cartApi.removeCartItem(product);
    this.cartItems = this.cartApi.getCartItems();
    this.calculateTotalAmount();
  }


}
