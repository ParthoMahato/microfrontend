import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AddressComponent } from './address.component';
import { AddressListComponent } from './addressList/address-list.component';
import { storeName } from './store/address.selectors';
import { addressReducer } from './store/address.reducer';
import { AddressEffects } from './store/address.effects';

const routes: Routes = [{
    path: '',
    component: AddressComponent,
    pathMatch: 'full'
}];

@NgModule({
    declarations: [
        AddressComponent,
        AddressListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(storeName, addressReducer),
        EffectsModule.forFeature([AddressEffects]),
    ]
})
export class AddressModule { }
