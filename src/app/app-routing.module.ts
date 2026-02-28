import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/products/products.component';
import { OrderComponent } from './components/order/order.component';
import { WishListComponent } from './components/wish-list/wish-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'products', component: ProductComponent
  },
  {
    path: 'orders', component: OrderComponent
  },
  {
    path: 'wish-list', component: WishListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
