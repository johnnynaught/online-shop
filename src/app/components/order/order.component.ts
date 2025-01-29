import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orderapi.service';
import { OrderDto } from '../../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: OrderDto[] = []; // Initialize orders as an empty array
  isLoading: boolean = true; // Track loading state
  expandedOrderId: number | null = null; // Track expanded order details

  constructor(private orderApi: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch all orders from the API
  fetchOrders(): void {
    this.isLoading = true;
    this.orderApi.getOrders().subscribe({
      next: (data) => {
        this.orders = data; // Assign fetched data to orders
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.isLoading = false;
      },
    });
  }
  
  expandedIndex: number = -1;  // Using -1 as initial state since indexes are always >= 0

  toggleOrderDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }
}
