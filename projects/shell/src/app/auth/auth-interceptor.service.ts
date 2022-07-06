import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { globalState } from '../store/shell.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<globalState>
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    if (req.url.indexOf('.json') != -1) {
      let token: string | null = "";
      this.store.select((state: globalState) => state).pipe(take(1)).subscribe(
        (state: globalState) => {
          if (state['login-reducer']) {
            if (Object.keys(state['login-reducer'].user).length > 0) {
              let userData = state['login-reducer'].user;
              token = userData.token;
            }
          }
        }
      );
      let modifiedReq = req.clone({
        params: new HttpParams().set('auth', token)
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
