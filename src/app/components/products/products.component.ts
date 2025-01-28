import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductApiService } from '../../services/productapi.service';
import { CartapiService } from '../../services/cartapi.service';
import { ShoppingCartDto } from '../../models/ShoppingCart';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productApi: ProductApiService,
    private cartApi: CartapiService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts(): void {
    this.productApi.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }

  // Add a product to the cart
  addToCart(product: Product): void {
    const cartDto: ShoppingCartDto = {
      userId: 101, // Replace with actual user ID (e.g., from authentication)
      productId: product.id,
      title: product.title, // Product title
      image: product.image, // Product image URL
      price: product.price, // Product price
      quantity: 1, // Default to 1
      subtotalPrice: product.price * 1, // Default subtotalPrice (quantity * price)
    };

    this.cartApi.addProductToCart(cartDto).subscribe({
      next: () => {
        console.log(`${product.title} added to the cart.`);
      },
      error: (err) => {
        console.error(`Failed to add ${product.title} to the cart:`, err);
      },
    });
  }
}
