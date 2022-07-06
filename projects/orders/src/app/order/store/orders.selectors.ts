import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHome from './orders.reducer';

export const storeName = "orders-reducer";
const getOrderState = createFeatureSelector<fromHome.State>(storeName);

export const selectLoading = createSelector(
  getOrderState,
  (state: fromHome.State) => state.isLoading
);

export const selectOrders = createSelector(
  getOrderState,
  (state: fromHome.State) => state.ordersList
);
