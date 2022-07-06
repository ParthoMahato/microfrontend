import { createReducer, on } from '@ngrx/store';
import { Address, PinCodeSummary } from '../../home.model';
import * as HomeActions from './home.actions';

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

export const reducer = createReducer(
  initialState,
  on(HomeActions.fetchItemsSuccess, (state, payload) => ({
    ...state,
    allItems: payload.allItems,
    isLoading: false
  })),
  on(HomeActions.fetchCalculationSuccess, (state, payload) => ({
    ...state,
    calculation: payload.cal,
    isLoading: false
  })),
  on(
    HomeActions.fetchItemsStart,
    HomeActions.addToCartStart,
    HomeActions.fetchCartItemsStart,
    HomeActions.deleteCartItemStart,
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
