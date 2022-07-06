import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { storeName } from './store/login.selectors';
import { reducer } from './store/login.reducer';
import { LoginComponent } from './login.component';
import { CounterComponent } from '../counter/counter.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
},
{
  path: 'counter',
  component: CounterComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
