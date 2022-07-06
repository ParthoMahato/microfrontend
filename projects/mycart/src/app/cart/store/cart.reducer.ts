import { createReducer, on } from '@ngrx/store';
import {
  Address,
  Calculation,
  Item,
  OrderSummary,
  PinCodeSummary
} from '../../home.model';
import * as HomeActions from './cart.actions';

export interface State {
  allItems: Item[];
  cartItems: Item[];
  calculation: Calculation;
  isLoading: boolean;
  pinCodeSummary: PinCodeSummary;
  addressList: Address[];
  ordersList: OrderSummary[];
}

export const initialState: State = {
  allItems: [],
  cartItems: [],
  calculation: {} as Calculation,
  isLoading: false,
  pinCodeSummary: {} as PinCodeSummary,
  addressList: [],
  ordersList: []
};

export const cartReducer = createReducer(
  initialState,
  on(HomeActions.updateCartItems, (state, payload) => {
    let modifiedCartItems: Item[] = [];
    if (payload.item && payload.item.length > 0) {
      modifiedCartItems = [...payload.item];
    } else if (!payload.item || payload.item.length === 0) {
      modifiedCartItems = [];
    }

    return {
      ...state,
      cartItems: modifiedCartItems,
      isLoading: false
    };
  }),
  on(HomeActions.fetchCalculationSuccess, (state, payload) => ({
    ...state,
    calculation: payload.cal,
    isLoading: false
  })),
  on(
    HomeActions.fetchCartItemsStart,
    HomeActions.deleteCartItemStart,
    HomeActions.fetchAddressStart,
    HomeActions.saveOrderStart,
    state => ({
      ...state,
      isLoading: true
    })
  ),
  on(HomeActions.saveAddressSuccess, (state, payload) => ({
    ...state,
    addressList: [...payload.listOfAddress],
    isLoading: false
  })),
  on(HomeActions.updateOrderSuccess, (state, payload) => {
    let updatedList = [...payload.orderSummarySuccess];
    return {
      ...state,
      ordersList: updatedList,
      isLoading: false
    };
  })
);
