import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  Address,
  PinCodeSummary
} from '../../home.model';
import { of } from 'rxjs';
import * as AddressActions from './address.actions';

const handlePinCodeDetails = (details: [{ PostOffice: [{ Name: string, State: string, District: string }] }]) => {
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
export class AddressEffects {
  pinCodeDetails$ = createEffect(() =>
    this.action$.pipe(
      ofType(AddressActions.FETCH_PIN_CODE_DETAILS_START),
      switchMap(({ pin }) => {
        return this.http.get<[{ PostOffice: [{ Name: string, State: string, District: string }] }]>('https://api.postalpincode.in/pincode/' + pin);
      }),
      map(details => {
        let formattedDetails = handlePinCodeDetails(details);
        return AddressActions.fetchPinCodeDetailsSuccess(formattedDetails);
      })
    )
  );

  saveAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(AddressActions.SAVE_ADDRESS_START),
      switchMap(({ listOfAddress }) => {
        return this.http.put<Address[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/address.json',
          listOfAddress
        );
      }),
      map(details => {
        return AddressActions.saveAddressSuccess({ listOfAddress: details });
      })
    )
  );

  fetchAddress$ = createEffect(() =>
    this.action$.pipe(
      ofType(AddressActions.FETCH_ADDRESS_START),
      switchMap(() => {
        return this.http.get<Address[]>(
          'https://ng-fresh-cart-default-rtdb.firebaseio.com/address.json'
        );
      }),
      map(details => {
        return AddressActions.saveAddressSuccess({ listOfAddress: details });
      })
    )
  );

  constructor(private action$: Actions, private http: HttpClient) { }
}
