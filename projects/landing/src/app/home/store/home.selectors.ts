import { createFeatureSelector, createSelector } from '@ngrx/store';
//import * as fromApp from '../../store/app.reducer';
import * as fromHome from './home.reducer';

export const storeName = "home-reducer";
const getHomeState = createFeatureSelector<fromHome.State>(storeName);
//export const selectHome = (state: fromApp.AppState) => state.home;

export const selectAllItems = createSelector(
  getHomeState,
  (state: fromHome.State) => state.allItems
);

export const selectCartItems = createSelector(
  getHomeState,
  (state: fromHome.State) => state.cartItems
);

// export const selectCalculation = createSelector(
//   selectHome,
//   (state: fromHome.State) => state.calculation
// );

// export const selectLoading = createSelector(
//   selectHome,
//   (state: fromHome.State) => state.isLoading
// );

// export const selectPinCodeSummary = createSelector(
//   selectHome,
//   (state: fromHome.State) => state.pinCodeSummary
// );

// export const selectAddress = createSelector(
//   selectHome,
//   (state: fromHome.State) => state.addressList
// );

// export const selectOrders = createSelector(
//   selectHome,
//   (state: fromHome.State) => state.ordersList
// );
