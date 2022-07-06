import { createReducer, on } from '@ngrx/store';
import { OrderSummary } from '../../home.model';
import * as HomeActions from './orders.actions';

export interface State {
  ordersList: OrderSummary[];
  isLoading: boolean;
}

export const initialState: State = {
  ordersList: [],
  isLoading: false
};

export const ordersReducer = createReducer(
  initialState,
  on(HomeActions.updateOrderSuccess, (state, payload) => {
    let updatedList = [...payload.orderSummarySuccess];
    return {
      ...state,
      ordersList: updatedList,
      isLoading: false
    };
  }),
  on(HomeActions.fetchOrdersStart, (state) => {
    return {
      ...state,
      isLoading: true
    };
  })
);
