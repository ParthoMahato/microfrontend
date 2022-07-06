import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { storeName } from './store/login.selectors';
import { storeName as CounterStoreName } from '../counter/store/counter.selectors'
import { reducer } from './store/login.reducer';
import { hostCounterReducer } from '../counter/store/counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffect } from './store/login.effects';
import { AlertComponent } from '../alert/alert.component';
const routes: Routes = [{
    path: '',
    component: LoginComponent,
}];


@NgModule({
    declarations: [
        LoginComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(storeName, reducer),
        EffectsModule.forFeature([LoginEffect]),
    ]
})
export class LoginModule { }
