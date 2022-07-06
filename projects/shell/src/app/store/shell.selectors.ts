import { state } from '@angular/animations';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AddressState, CartState, LandingState, LoginState, OrdersState, ShellState } from './globalState';
import { State } from './shell.reducer';

export const storeName = "shell-reducer";
export interface globalState  {
    'shell-reducer' ?: ShellState ,
    'login-reducer' ?: LoginState ,
    'landing-reducer'?: LandingState ,
    'cart-reducer' ?: CartState ,
    'orders-reducer' ?: OrdersState ,
    'address-reducer' ?: AddressState 
}

const getAppState = createFeatureSelector <State>(storeName);
export const getLatestCounter = createSelector(getAppState, state => state.counter);



