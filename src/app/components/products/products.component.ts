import { Component } from '@angular/core';
import { CartapiService } from '../../services/cartapi.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productList: Product [] = [];
  constructor(private cartApi: CartapiService) {}

  ngOnInit(): void {
    this.cartApi.fetchProducts().subscribe((products) => {
      this.productList = products;
    });
  }

  addToCart(product: Product): void {
    // console.log('Product added to cart', product);
    this.cartApi.addToCart(product);
  }
}
