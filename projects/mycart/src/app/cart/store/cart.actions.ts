import { createAction, props } from '@ngrx/store';
import {
  Address,
  Calculation,
  Item,
  OrderSummary,
} from '../../home.model';

export const FETCH_CART_ITEMS_START = '[Cart Page] Fetch cart items';
export const FETCH_ADDRESS_START = '[Cart Page] Fetch Address start';
export const FETCH_CALCULATION_START = '[Cart Page] Fetch calculation start';
export const FETCH_CALCULATION_SUCCESS = '[Cart Page] Fetch calucation success';
export const DELETE_CART_ITEM_START = '[Cart Page] Delete cart item start';
export const SAVE_ORDER_START = '[Cart Page] Save order start';
export const UPDATE_ORDER_SUCCESS = '[Cart Page] Update order success';
export const UPDATE_CART_ITEMS = '[Cart Page] Update cart items';
export const SAVE_ADDRESS_SUCCESS = '[Cart Page] Save Address Success';

export const fetchCartItemsStart = createAction(FETCH_CART_ITEMS_START);
export const fetchAddressStart = createAction(FETCH_ADDRESS_START);
export const fetchCalculationStart = createAction(FETCH_CALCULATION_START);

export const fetchCalculationSuccess = createAction(
  FETCH_CALCULATION_SUCCESS,
  props<{ cal: Calculation }>()
);

export const deleteCartItemStart = createAction(
  DELETE_CART_ITEM_START,
  props<{ item: Item[] }>()
);

export const saveOrderStart = createAction(
  SAVE_ORDER_START,
  props<{ orderSummary: OrderSummary[] }>()
);

export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<{ orderSummarySuccess: OrderSummary[] }>()
);

export const updateCartItems = createAction(
  UPDATE_CART_ITEMS,
  props<{ item: Item[] }>()
);

export const saveAddressSuccess = createAction(
  SAVE_ADDRESS_SUCCESS,
  props<{ listOfAddress: Address[] }>()
);
