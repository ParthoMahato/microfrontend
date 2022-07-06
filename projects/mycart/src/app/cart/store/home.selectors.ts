import { createFeatureSelector, createSelector } from '@ngrx/store';
//import * as fromApp from '../../store/app.reducer';
import * as fromHome from './home.reducer';

//export const selectHome = (state: fromApp.AppState) => state.home;
export const storeName = "cart-reducer";
const getCartState = createFeatureSelector<fromHome.State>(storeName);

export const selectCartItems = createSelector(
  getCartState,
  (state: fromHome.State) => state.cartItems
);

export const selectCalculation = createSelector(
  getCartState,
  (state: fromHome.State) => state.calculation
);

export const selectLoading = createSelector(
  getCartState,
  (state: fromHome.State) => state.isLoading
);

export const selectPinCodeSummary = createSelector(
  getCartState,
  (state: fromHome.State) => state.pinCodeSummary
);

export const selectAddress = createSelector(
  getCartState,
  (state: fromHome.State) => state.addressList
);

export const selectOrders = createSelector(
  getCartState,
  (state: fromHome.State) => state.ordersList
);
