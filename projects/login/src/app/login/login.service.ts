import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0b_Xpa-Dis5H9NxXII2xKIY_H7Xv13DE',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0b_Xpa-Dis5H9NxXII2xKIY_H7Xv13DE',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resData => {
          console.log(resData);
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          let user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );

          this.user.next(user);
        })
      );
  }
}
