import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiUrl = 'http://34.232.71.14:8080/api/orders'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(this.orderApiUrl);
  }

  // Submit an order
  submitOrder(orderDto: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.orderApiUrl, orderDto);
  }
}
