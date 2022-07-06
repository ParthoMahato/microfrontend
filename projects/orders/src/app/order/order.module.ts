import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { OrdersComponent } from './orders.component';
import { storeName } from './store/orders.selectors';
import { ordersReducer } from './store/orders.reducer';
import { OrdersEffects } from './store/orders.effects';

const routes: Routes = [{
    path: '',
    component: OrdersComponent,
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        OrdersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(storeName, ordersReducer),
        EffectsModule.forFeature([OrdersEffects]),
    ]
})
export class OrderModule { }
