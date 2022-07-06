import { createFeatureSelector, createSelector } from '@ngrx/store';
//import * as fromApp from '../../store/app.reducer';
import * as fromHome from './home.reducer';

//export const selectHome = (state: fromApp.AppState) => state.home;
export const storeName = "address-reducer";
const getAddressState = createFeatureSelector<fromHome.State>(storeName);

export const selectLoading = createSelector(
  getAddressState,
  (state: fromHome.State) => state.isLoading
);

export const selectPinCodeSummary = createSelector(
  getAddressState,
  (state: fromHome.State) => state.pinCodeSummary
);

export const selectAddress = createSelector(
  getAddressState,
  (state: fromHome.State) => state.addressList
);

