
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductGraphqlService {

  constructor(private apollo: Apollo) { }

  getAllProducts(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          products {
            id
            name
            price
            description
            image
          }
        }
      `
    }).valueChanges;
  }
}
