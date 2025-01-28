import { Component, OnInit } from '@angular/core';
import { CartapiService} from '../../services/cartapi.service';
import { ShoppingCartDto } from '../../models/ShoppingCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: ShoppingCartDto[] = [];
  totalAmount: number = 0;

  constructor(private cartApi: CartapiService) {}

  ngOnInit(): void {
    // Fetch cart items from the service
    this.fetchCartItems();
  }

  // Fetch cart items and calculate total amount
  fetchCartItems(): void {
    this.cartApi.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.fetchTotalAmount();
      },
      error: (err) => {
        console.error('Failed to fetch cart items:', err);
      },
    });
  }

  // Fetch total amount from the backend
  fetchTotalAmount(): void {
    this.cartApi.getTotalAmount().subscribe({
      next: (amount) => {
        this.totalAmount = amount;
      },
      error: (err) => {
        console.error('Failed to fetch total amount:', err);
      },
    });
  }

  // Remove item from the cart
  removeItem(cartItemId: number): void {
    this.cartApi.removeCartItem(cartItemId).subscribe({
      next: () => {
        this.fetchCartItems(); // Refresh cart items after removal
      },
      error: (err) => {
        console.error('Failed to remove item from cart:', err);
      },
    });
  }


  submitOrder(): void {
    this.cartApi.submitOrder().subscribe({
      next: () => {
        this.cartItems = []; // Clear the cart after successful order
        this.totalAmount = 0; // Reset the total amount
        alert('Your order has been successfully submitted!');
      },
      error: (err) => {
        console.error('Failed to submit the order:', err);
        alert('There was an error submitting your order. Please try again.');
      },
    });
  }
  
}
