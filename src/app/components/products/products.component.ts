import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/productapi.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productList: Product [] = [];
  constructor(private productApi: ProductService) {}

  ngOnInit(): void {
    this.productApi.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

  addToCart(product: Product): void {
    // console.log('Product added to cart', product);
    this.productApi.addToCart(product);
  }
}
