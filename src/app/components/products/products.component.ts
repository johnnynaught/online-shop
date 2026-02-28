
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductGraphqlService } from '../../services/product-graphql.service';
import { ShoppingCartDto } from '../../models/ShoppingCart';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';

@Component({
    selector: 'app-product',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
    standalone: false
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productGraphqlService: ProductGraphqlService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts(): void {
    this.productGraphqlService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.data.products;
        this.filteredProducts = this.products;
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

    this.apollo.mutate({
      mutation: gql`
        mutation ($cartDto: ShoppingCartDto!) {
          addProductToCart(cartDto: $cartDto) {
            id
          }
        }
      `,
      variables: {
        cartDto: cartDto
      }
    }).subscribe({
      next: () => {
        console.log(`${product.title} added to the cart.`);
      },
      error: (err) => {
        console.error(`Failed to add ${product.title} to the cart:`, err);
      },
    });
  }

  onFilterApplied(filter: { minPrice: number; maxPrice: number }) {
    this.filteredProducts = this.products.filter(product => {
      return product.price >= filter.minPrice && product.price <= filter.maxPrice;
    });
  }
}

