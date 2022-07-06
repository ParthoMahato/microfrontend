import { createReducer, on } from '@ngrx/store';
import { Address, PinCodeSummary } from '../../home.model';
import * as HomeActions from './address.actions';

export interface State {
  pinCodeSummary: PinCodeSummary;
  addressList: Address[];
  isLoading: boolean;
}

export const initialState: State = {

  pinCodeSummary: {} as PinCodeSummary,
  addressList: [],
  isLoading: false,
};

export const addressReducer = createReducer(
  initialState,
  on(
    HomeActions.fetchAddressStart,
    state => ({
      ...state,
      isLoading: true
    })
  ),
  on(HomeActions.fetchPinCodeDetailsSuccess, (state, payload) => ({
    ...state,
    pinCodeSummary: { ...payload },
    isLoading: false
  })),
  on(HomeActions.saveAddressSuccess, (state, payload) => ({
    ...state,
    addressList: [...payload.listOfAddress],
    isLoading: false
  }))
);
