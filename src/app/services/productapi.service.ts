import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private productApiUrl = 'http://54.84.96.95:8080/api/products'; // Backend API URL for products

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiUrl);
  }

  // Fetch a single product by ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApiUrl}/${productId}`);
  }

  // Add a new product (admin feature)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productApiUrl, product);
  }

  // Update an existing product (admin feature)
  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productApiUrl}/${productId}`, product);
  }

  // Delete a product (admin feature)
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.productApiUrl}/${productId}`);
  }
}
