import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Item } from '../home.model';
import { of } from 'rxjs';
import * as LandingActions from './landing.actions';

@Injectable()
export class LandingEffects {
  fectchAllItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(LandingActions.FETCH_ITEMS_START),
      switchMap(() => {
        return this.http
          .get<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/allitems.json'
          )
          .pipe(
            map(items => {
              return LandingActions.fetchItemsSuccess({ allItems: items });
            })
          );
      })
    )
  );

  addToCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(LandingActions.ADD_TO_CART_START),
      switchMap(({ modifiedCartItems }) => {
        return this.http
          .put<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json',
            modifiedCartItems
          )
          .pipe(
            map(() => {
              return LandingActions.updateCartItems({ item: modifiedCartItems });
            })
          );
      })
    )
  );

  constructor(private action$: Actions, private http: HttpClient) { }
}
