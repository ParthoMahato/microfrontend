import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAddress from './address.reducer';

export const storeName = "address-reducer";
const getAddressState = createFeatureSelector<fromAddress.State>(storeName);

export const selectLoading = createSelector(
  getAddressState,
  (state: fromAddress.State) => state.isLoading
);

export const selectPinCodeSummary = createSelector(
  getAddressState,
  (state: fromAddress.State) => state.pinCodeSummary
);

export const selectAddress = createSelector(
  getAddressState,
  (state: fromAddress.State) => state.addressList
);

