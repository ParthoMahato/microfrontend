import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  Address,
  Calculation,
  Item,
  OrderSummary,
  PinCodeSummary
} from '../../home.model';
import { of } from 'rxjs';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  fetchCartItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.FETCH_CART_ITEMS_START),
      switchMap(() => {
        return this.http.get<Item[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json'
        );
      }),
      map(items => {
        return CartActions.updateCartItems({ item: items });
      })
    )
  );

  fetchCalculation$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.FETCH_CALCULATION_START),
      switchMap(() => {
        return this.http.get<Calculation>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/calculation.json'
        );
      }),
      map(cal => {
        return CartActions.fetchCalculationSuccess({ cal: cal });
      })
    )
  );

  deleteCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.DELETE_CART_ITEM_START),
      switchMap(({ item }) => {
        return this.http
          .put<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json',
            item
          )
          .pipe(
            map(() => {
              return CartActions.updateCartItems({ item: item });
            })
          );
      })
    )
  );

  fetchAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.FETCH_ADDRESS_START),
      switchMap(() => {
        return this.http.get<Address[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/address.json'
        );
      }),
      map(details => {
        return CartActions.saveAddressSuccess({ listOfAddress: details });
      })
    )
  );

  saveOrder$ = createEffect(() =>
    this.action$.pipe(
      ofType(CartActions.SAVE_ORDER_START),
      switchMap(({ orderSummary }) => {
        return this.http.put<OrderSummary[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/orders.json',
          orderSummary
        );
      }),
      switchMap(details => [
        CartActions.updateOrderSuccess({ orderSummarySuccess: details }),
        CartActions.deleteCartItemStart({ item: [] })
      ])
    )
  );

  constructor(private action$: Actions, private http: HttpClient) { }
}
