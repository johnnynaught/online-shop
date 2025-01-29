import { Component, OnInit } from '@angular/core';
import { CartapiService} from '../../services/cartapi.service';
import { ShoppingCartDto } from '../../models/ShoppingCart';
import { OrderService } from '../../services/orderapi.service';
import { OrderDto } from '../../models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: ShoppingCartDto[] = [];
  totalAmount: number = 0;

  constructor(private cartApi: CartapiService, private orderApi: OrderService) {}

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


  // Submit order
  submitOrder(): void {
    const order: OrderDto = {
      userId: 101, // Replace with actual user ID
      orderTime: new Date().toISOString(),
      totalPrice: this.totalAmount,
      items: this.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        singleProductPrice: item.price,
      })),
    };

    this.orderApi.submitOrder(order).subscribe({
      next: (createdOrder) => {
        console.log('Order submitted successfully:', createdOrder);
        alert('Order submitted!');
        this.cartItems = []; // Clear the cart
        this.totalAmount = 0; // Reset total amount
      },
      error: (err) => {
        console.error('Failed to submit order:', err);
        alert('Order submission failed.');
      },
    });
  }
  
}
