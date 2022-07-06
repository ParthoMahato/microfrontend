import { createAction, props } from '@ngrx/store';
import { Item } from '../home.model';

export const FETCH_ITEMS_START = '[Landing Page] Fetch items start';
export const FETCH_ITEMS_SUCCESS = '[Landing Page] Fetch items success';
export const ADD_TO_CART_START = '[Landing Page] Add to cart start';
export const UPDATE_CART_ITEMS = '[Landing Page] Update cart items';

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







