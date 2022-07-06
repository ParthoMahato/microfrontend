import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';

export const storeName = "cart-reducer";
const getCartState = createFeatureSelector<fromCart.State>(storeName);

export const selectCartItems = createSelector(
  getCartState,
  (state: fromCart.State) => state.cartItems
);

export const selectCalculation = createSelector(
  getCartState,
  (state: fromCart.State) => state.calculation
);

export const selectLoading = createSelector(
  getCartState,
  (state: fromCart.State) => state.isLoading
);

export const selectPinCodeSummary = createSelector(
  getCartState,
  (state: fromCart.State) => state.pinCodeSummary
);

export const selectAddress = createSelector(
  getCartState,
  (state: fromCart.State) => state.addressList
);

export const selectOrders = createSelector(
  getCartState,
  (state: fromCart.State) => state.ordersList
);
