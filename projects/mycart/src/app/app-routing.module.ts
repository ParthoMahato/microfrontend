import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'cart',
  pathMatch: 'full'
},
{
  path: 'cart',
  component: CartComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
