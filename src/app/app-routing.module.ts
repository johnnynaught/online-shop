import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'products', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
