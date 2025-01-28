import { Component, OnInit } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Fixed 'styleUrls' typo
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartApi: CartapiService) {}

  ngOnInit(): void {
    // Fetch the cart item count on initialization
    this.cartApi.getCartItemCount().subscribe({
      next: (count) => {
        this.cartItemCount = count;
      },
      error: (err) => {
        console.error('Error fetching cart item count:', err);
      },
    });
  }
}
