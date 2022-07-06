import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './home/overview/overview.component';
const routes: Routes = [{
  path: '',
  redirectTo: 'landing',
  pathMatch: 'full'
},
{
  path: 'landing',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'
    },
    {
      path: 'overview',
      component: OverviewComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
