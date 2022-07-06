import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  pathMatch: 'full'
}, {
  path: 'counter',
  component: CounterComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
