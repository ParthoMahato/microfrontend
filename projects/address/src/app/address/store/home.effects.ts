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
import * as HomeActions from './home.actions';

const handlePinCodeDetails = (details : [{ PostOffice: [{ Name: string, State: string, District: string }] }]) => {
  let postOffice;
  let pinCodeDetails = details[0];
  let pinCodeSummary: PinCodeSummary;
  let area: string[] = [];
  if (pinCodeDetails.PostOffice) {
    postOffice = pinCodeDetails.PostOffice;
    postOffice.map(value => {
      area.push(value.Name);
    });

    pinCodeSummary = new PinCodeSummary(
      area,
      postOffice[0].State,
      postOffice[0].District
    );
  } else {
    pinCodeSummary = new PinCodeSummary(area, '', '');
  }

  return pinCodeSummary;
};

@Injectable()
export class HomeEffects {
  fectchAllItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.FETCH_ITEMS_START),
      switchMap(() => {
        return this.http
          .get<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/allitems.json'
          )
          .pipe(
            map(items => {
              return HomeActions.fetchItemsSuccess({ allItems: items });
            })
          );
      })
    )
  );

  addToCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.ADD_TO_CART_START),
      switchMap(({ modifiedCartItems }) => {
        return this.http
          .put<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json',
            modifiedCartItems
          )
          .pipe(
            map(() => {
              return HomeActions.updateCartItems({ item: modifiedCartItems });
            })
          );
      })
    )
  );

  fetchCartItems$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.FETCH_CART_ITEMS_START),
      switchMap(() => {
        return this.http.get<Item[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json'
        );
      }),
      map(items => {
        return HomeActions.updateCartItems({ item: items });
      })
    )
  );

  fetchCalculation$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.FETCH_CALCULATION_START),
      switchMap(() => {
        return this.http.get<Calculation>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/calculation.json'
        );
      }),
      map(cal => {
        console.log('cal' + cal);
        return HomeActions.fetchCalculationSuccess({ cal: cal });
      })
    )
  );

  deleteCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.DELETE_CART_ITEM_START),
      switchMap(({ item }) => {
        return this.http
          .put<Item[]>(
            'https://ng-fresh-cart-default-rtdb.firebaseio.com/carts.json',
            item
          )
          .pipe(
            map(() => {
              return HomeActions.updateCartItems({ item: item });
            })
          );
      })
    )
  );

  pinCodeDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.FETCH_PIN_CODE_DETAILS_START),
      switchMap(({ pin }) => {
        return this.http.get<[{ PostOffice: [{ Name: string, State: string, District: string }] }]>('https://api.postalpincode.in/pincode/' + pin);
      }),
      map(details => {
        let formattedDetails = handlePinCodeDetails(details);
        return HomeActions.fetchPinCodeDetailsSuccess(formattedDetails);
      })
    )
  );

  saveAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.SAVE_ADDRESS_START),
      switchMap(({ listOfAddress }) => {
        return this.http.put<Address[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/address.json',
          listOfAddress
        );
      }),
      map(details => {
        return HomeActions.saveAddressSuccess({ listOfAddress: details });
      })
    )
  );

  fetchAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(HomeActions.FETCH_ADDRESS_START),
      switchMap(() => {
        return this.http.get<Address[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/address.json'
        );
      }),
      map(details => {
        return HomeActions.saveAddressSuccess({ listOfAddress: details });
      })
    )
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
