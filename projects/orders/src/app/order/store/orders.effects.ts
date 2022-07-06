import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { OrderSummary } from '../../home.model';
import * as OrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  fetchOrders$ = createEffect(() =>
    this.action$.pipe(
      ofType(OrdersActions.FETCH_ORDERS_START),
      switchMap(() => {
        return this.http.get<OrderSummary[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/orders.json'
        );
      }),
      map(details => {
        return OrdersActions.updateOrderSuccess({ orderSummarySuccess: details });
      })
    )
  );

  constructor(private action$: Actions, private http: HttpClient) { }
}
