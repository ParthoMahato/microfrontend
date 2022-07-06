import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CartComponent } from './cart.component';
import { CartSummaryComponent } from './cartSummary/cart-summary.component';
import { CartItemscomponent } from './cartItems/cart-items.component';
import { storeName } from './store/cart.selectors';
import { cartReducer } from './store/cart.reducer';
import { CartEffects } from './store/cart.effects';
import { DecimalPipe } from './pipe/decimal.pipe';
const routes: Routes = [{
    path: '',
    component: CartComponent,
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        CartComponent,
        CartSummaryComponent,
        CartItemscomponent,
        DecimalPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(storeName, cartReducer),
        EffectsModule.forFeature([CartEffects]),
    ]
})
export class CartModule { }
