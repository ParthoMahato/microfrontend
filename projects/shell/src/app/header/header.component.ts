import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectUser, State } from './reducer.details';
import * as ShellActions from '../store/shell.actions';
import { Observable, Subscription } from 'rxjs';
import {  globalState } from '../store/shell.selectors';
import { filter, last, map, take, takeLast } from 'rxjs/operators';
import { LoginState } from '../store/globalState';

@Component({
  selector: 'cart-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: boolean = false;
  errorMessage: string = "";
  counter$!: Observable<number>;
  counterSubscription$!: Subscription;
  test$!: Observable<LoginState>;
  testSubscription$ !:Subscription; 
  constructor(private router: Router, private store: Store<globalState>) { }
  ngOnInit() {
    this.store.select((state: globalState) => state).subscribe(
      (state: globalState) => {
        if (state['login-reducer']) {
          
          if (Object.keys(state['login-reducer'].user).length > 0) {
            this.loggedInUser = true;
          } else {
            this.loggedInUser = false;
          }
        }
      }
    );
  }

  logout() {
    this.store.dispatch(ShellActions.logout());
    this.router.navigate(['./login']);
  }
}
