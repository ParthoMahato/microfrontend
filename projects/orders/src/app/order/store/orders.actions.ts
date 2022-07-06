import { createAction, props } from '@ngrx/store';
import { OrderSummary } from '../../home.model';

export const UPDATE_ORDER_SUCCESS = '[Orders Page] Update order success';
export const FETCH_ORDERS_START = '[Orders Page] Fetch Orders start';

export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<{ orderSummarySuccess: OrderSummary[] }>()
);

export const fetchOrdersStart = createAction(FETCH_ORDERS_START);
