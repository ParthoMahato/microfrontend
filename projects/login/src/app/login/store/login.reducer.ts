import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as LoginActions from './login.actions';

export interface State {
  user: User;
  errorMsg: string;
  loading: boolean;
}

export const initialState: State = {
  user: {} as User,
  errorMsg: "",
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(LoginActions.failure, (state, actionData) => ({
    ...state,
    errorMsg: actionData.errorMsg,
    loading: false
  })),
  on(LoginActions.clearErrorMessage, state => ({ ...state, errorMsg: "" })),
  on(LoginActions.loginSuccess, (state, userData) => {
    const user = new User(
      userData.email,
      userData.userId,
      userData.token,
      userData.expirationDate
    );

    return {
      ...state,
      user: user,
      loading: false
    };
  }),
  on(LoginActions.loginStart, LoginActions.signUpStart, state => ({
    ...state,
    loading: true
  })),
  on(LoginActions.logout, state => ({ ...state, user: {} as User, }))
);
