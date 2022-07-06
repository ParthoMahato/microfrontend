import { createAction, props } from '@ngrx/store';
import { Address, PinCodeSummary } from '../../home.model';

export const FETCH_ADDRESS_START = '[Address Page] Fetch Address start';
export const FETCH_PIN_CODE_DETAILS_START =
  '[Address Page] Fetch pin code details start';
export const FETCH_PIN_CODE_DETAILS_SUCCESS =
  '[Address Page] Fetch pin code details success';
export const SAVE_ADDRESS_START = '[Address Page] Save Address Start';
export const SAVE_ADDRESS_SUCCESS = '[Address Page] Save Address Success';

export const fetchAddressStart = createAction(FETCH_ADDRESS_START);

export const fetchPinCodeDetailsStart = createAction(
  FETCH_PIN_CODE_DETAILS_START,
  props<{ pin: number }>()
);

export const saveAddressStart = createAction(
  SAVE_ADDRESS_START,
  props<{ listOfAddress: Address[] }>()
);

export const saveAddressSuccess = createAction(
  SAVE_ADDRESS_SUCCESS,
  props<{ listOfAddress: Address[] }>()
);

export const fetchPinCodeDetailsSuccess = createAction(
  FETCH_PIN_CODE_DETAILS_SUCCESS,
  props<PinCodeSummary>()
);


