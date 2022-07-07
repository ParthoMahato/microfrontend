import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShellActions from '../store/shell.actions';
import { globalState } from '../store/shell.selectors';


@Component({
  selector: 'cart-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: boolean = false;
  errorMessage: string = "";
  hamburgerActive: boolean = false;
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
