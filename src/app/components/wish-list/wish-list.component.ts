
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
  standalone: false
})
export class WishListComponent implements OnInit {
  wishlist$!: Observable<any[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.wishlist$ = this.apollo.watchQuery<any>({
      query: gql`
        query {
          wishlist {
            id
            product {
              id
              name
              price
              image
            }
          }
        }
      `,
    }).valueChanges.pipe(map((result) => result.data.wishlist));
  }

  removeFromWishlist(id: string): void {
    this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!) {
          removeFromWishlist(id: $id)
        }
      `,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: gql`
            query {
              wishlist {
                id
                product {
                  id
                  name
                  price
                  image
                }
              }
            }
          `,
        },
      ],
    }).subscribe();
  }
}
