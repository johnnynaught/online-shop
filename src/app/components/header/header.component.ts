import { Component } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartItemCount$: Observable<number>; // Use Observable for auto-updates

  constructor(private cartApi: CartapiService) {
    this.cartItemCount$ = this.cartApi.getCartItemCount(); // Subscribe to updates
  }
}
