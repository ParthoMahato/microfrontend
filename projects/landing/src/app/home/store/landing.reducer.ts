import { createReducer, on } from '@ngrx/store';
import {
  Address,
  Calculation,
  Item,
  OrderSummary,
  PinCodeSummary
} from '../home.model';
import * as LandingActions from './landing.actions';

export interface State {
  allItems: Item[];
  cartItems: Item[];
  isLoading:boolean
}

export const initialState: State = {
  allItems: [],
  cartItems: [],
  isLoading: false
};

export const landingReducer = createReducer(
  initialState,
  on(LandingActions.fetchItemsSuccess, (state, payload) => ({
    ...state,
    allItems: payload.allItems,
    isLoading: false
  })),
  on(LandingActions.updateCartItems, (state, payload) => {
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
  on(
    LandingActions.fetchItemsStart,
    LandingActions.addToCartStart,
    state => ({
      ...state,
      isLoading: true
    })
  )
);
