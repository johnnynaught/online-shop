
import { Component, OnInit } from '@angular/core';
import { OrderDto } from '../../models/Order';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-orders',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    standalone: false
})
export class OrderComponent implements OnInit {
  orders$!: Observable<OrderDto[]>;
  isLoading: boolean = true;
  expandedOrderId: number | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.orders$ = this.apollo.watchQuery<any>({
      query: gql`
        query {
          orders {
            id
            userId
            orderTime
            totalPrice
            items {
              productId
              quantity
              singleProductPrice
            }
          }
        }
      `
    }).valueChanges.pipe(
      map(result => {
        this.isLoading = false;
        return result.data.orders;
      })
    );
  }
  
  expandedIndex: number = -1;

  toggleOrderDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }
}

