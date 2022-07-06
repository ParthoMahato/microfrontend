import { createAction, props } from '@ngrx/store';
import {
  Address,
  Calculation,
  Item,
  OrderSummary,
  PinCodeSummary
} from '../../home.model';

export const FETCH_ITEMS_START = '[Home Page] Fetch items start';
export const FETCH_ITEMS_SUCCESS = '[Home Page] Fetch items success';
export const ADD_TO_CART_START = '[Home Page] Add to cart start';
export const UPDATE_CART_ITEMS = '[Home Page] Update cart items';
export const FETCH_CART_ITEMS_START = '[Home Page] Fetch cart items';
export const FETCH_CALCULATION_START = '[Home Page] Fetch calculation start';
export const FETCH_CALCULATION_SUCCESS = '[Home Page] Fetch calucation success';
export const DELETE_CART_ITEM_START = '[Home Page] Delete cart item start';
export const FETCH_PIN_CODE_DETAILS_START =
  '[Home Page] Fetch pin code details start';
export const FETCH_PIN_CODE_DETAILS_SUCCESS =
  '[Home Page] Fetch pin code details success';

export const SAVE_ADDRESS_START = '[Home Page] Save Address Start';
export const SAVE_ADDRESS_SUCCESS = '[Home Page] Save Address Success';
export const FETCH_ADDRESS_START = '[Home Page] Fetch Address start';
export const SAVE_ORDER_START = '[Home Page] Save order start';
export const UPDATE_ORDER_SUCCESS = '[Home Page] Update order success';
export const FETCH_ORDERS_START = '[Home Page] Fetch Orders start';

export const fetchItemsStart = createAction(FETCH_ITEMS_START);
export const fetchItemsSuccess = createAction(
  FETCH_ITEMS_SUCCESS,
  props<{ allItems: Item[] }>()
);

export const addToCartStart = createAction(
  ADD_TO_CART_START,
  props<{ modifiedCartItems: Item[] }>()
);

export const updateCartItems = createAction(
  UPDATE_CART_ITEMS,
  props<{ item: Item[] }>()
);

export const fetchCartItemsStart = createAction(FETCH_CART_ITEMS_START);

export const fetchCalculationStart = createAction(FETCH_CALCULATION_START);

export const fetchCalculationSuccess = createAction(
  FETCH_CALCULATION_SUCCESS,
  props<{ cal: Calculation }>()
);

export const deleteCartItemStart = createAction(
  DELETE_CART_ITEM_START,
  props<{ item: Item[] }>()
);

export const fetchPinCodeDetailsStart = createAction(
  FETCH_PIN_CODE_DETAILS_START,
  props<{ pin: number }>()
);

export const fetchPinCodeDetailsSuccess = createAction(
  FETCH_PIN_CODE_DETAILS_SUCCESS,
  props<PinCodeSummary>()
);

export const saveAddressStart = createAction(
  SAVE_ADDRESS_START,
  props<{ listOfAddress: Address[] }>()
);

export const saveAddressSuccess = createAction(
  SAVE_ADDRESS_SUCCESS,
  props<{ listOfAddress: Address[] }>()
);

export const fetchAddressStart = createAction(FETCH_ADDRESS_START);

export const saveOrderStart = createAction(
  SAVE_ORDER_START,
  props<{ orderSummary: OrderSummary[] }>()
);

export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<{ orderSummarySuccess: OrderSummary[] }>()
);

export const fetchOrdersStart = createAction(FETCH_ORDERS_START);
