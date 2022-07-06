import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SignUp } from '../login.interface';
//import { AuthResponseData } from '../login.service';
import { User , AuthResponseData} from '../user.model';
import * as LoginActions from './login.actions';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return LoginActions.loginSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(LoginActions.failure({ errorMsg: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email exist already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is not correct';
      break;
  }
  return of(LoginActions.failure({ errorMsg: errorMessage }));
};

@Injectable()
export class LoginEffect {
  signUp$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoginActions.SIGNUP_START),
      switchMap((action: SignUp) => {
        console.log('SignUp testing effect' + action);
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0b_Xpa-Dis5H9NxXII2xKIY_H7Xv13DE',
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorData => {
              return handleError(errorData);
            })
          );
      })
    )
  );

  login = createEffect(() =>
    this.action$.pipe(
      ofType(LoginActions.LOGIN_START),
      switchMap((action: SignUp) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0b_Xpa-Dis5H9NxXII2xKIY_H7Xv13DE',
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true
            }
          )
          .pipe(
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              //Return non error obserabale
              return handleError(errorRes);
            })
          );
      })
    )
  );

  autoRedirect = createEffect(
    () =>
      this.action$.pipe(
        ofType(LoginActions.loginSuccess),
        tap(action => {
          if (action.redirect) {
            this.router.navigate(['/home/landing']);
          }
        })
      ),
    { dispatch: false }
  );

  test = createEffect(
    () =>
      this.action$.pipe(
        ofType(LoginActions.increment),
        tap(action => {
          console.log(action);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }
}
