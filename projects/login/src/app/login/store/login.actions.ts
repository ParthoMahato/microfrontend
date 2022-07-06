import { createAction, props } from '@ngrx/store';
import { SignUp } from '../login.interface';

export const LOGIN_START = '[Login Page]  Login Start';
export const LOGIN_SUCCESS = '[Login Page] Login Success';
export const SIGNUP_START = '[Login Page] Sign up Start';
export const LOGIN_SIGNUP_FAILURE = '[Login Page] Login/Signup failure';
export const CLEAR_ERR_MSG = '[Login Page] Clear error message';
export const LOGOUT = '[Login Page] logout';
export const TEST_START = "[Login Page] test start";

// Test global store call;
export const INCREMENT = "[Shell Page] increment";


export const testStart = createAction(TEST_START, props<{ name: string }>());

export const loginStart = createAction(LOGIN_START, props<SignUp>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const signUpStart = createAction(SIGNUP_START, props<SignUp>());
export const failure = createAction(
  LOGIN_SIGNUP_FAILURE,
  props<{ errorMsg: string }>()
);

export const clearErrorMessage = createAction(CLEAR_ERR_MSG);
export const logout = createAction(LOGOUT);


// Test
export const increment = createAction(INCREMENT, props<{ add: number }>());


