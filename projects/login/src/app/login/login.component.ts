import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromLogin from './store/login.reducer';
import * as LoginActions from './store/login.actions';
import { selectErrorMsg, selectLoading } from './store/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  errorMessage: string = "";
  isLoading: boolean = false;
  constructor(
    private store: Store<fromLogin.State>
  ) { }

  ngOnInit() {
    this.store.select(selectErrorMsg).subscribe(errorMsg => {
      this.errorMessage = errorMsg;
    });

    this.store.select(selectLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    if (this.isLoginMode) {
      this.store.dispatch(
        LoginActions.loginStart({
          email: form.value.email,
          password: form.value.password
        })
      );
    } else {
      this.store.dispatch(
        LoginActions.signUpStart({
          email: form.value.email,
          password: form.value.password
        })
      );
    }
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onClose() {
    this.errorMessage = "";
    this.store.dispatch(LoginActions.clearErrorMessage());
  }
}
