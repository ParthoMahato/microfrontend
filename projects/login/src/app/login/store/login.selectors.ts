import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';

export const storeName = "login-reducer";
const getLoginState = createFeatureSelector<fromLogin.State>(storeName);

export const selectErrorMsg = createSelector(
  getLoginState,
  (state: fromLogin.State) => state.errorMsg
);
export const selectUser = createSelector(
  getLoginState,
  (state: fromLogin.State) => state.user
);

export const selectLoading = createSelector(
  getLoginState,
  (state: fromLogin.State) => state.loading
);
