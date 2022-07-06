import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLanding from './landing.reducer';

export const storeName = "landing-reducer";
const getLandingState = createFeatureSelector<fromLanding.State>(storeName);

export const selectAllItems = createSelector(
  getLandingState,
  (state: fromLanding.State) => state.allItems
);

export const selectCartItems = createSelector(
  getLandingState,
  (state: fromLanding.State) => state.cartItems
);

export const selectLoading = createSelector(
  getLandingState,
  (state: fromLanding.State) => state.isLoading
);