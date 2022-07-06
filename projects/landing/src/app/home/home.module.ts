import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { OverviewComponent } from './overview/overview.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { storeName } from './store/landing.selectors';
import { landingReducer } from './store/landing.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LandingEffects } from './store/landing.effects';
import { DecimalPipe } from './pipe/decimal.pipe';
const routes: Routes = [{
    path: 'landing',
    component: HomeComponent,
    children: [{
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
    }
        , {
        path: 'overview',
        component: OverviewComponent,
    }
    ],
}];


@NgModule({
    declarations: [
        HomeComponent,
        OverviewComponent,
        ItemsComponent,
        ItemComponent,
        DecimalPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(storeName, landingReducer),
        EffectsModule.forFeature([LandingEffects]),
    ]
})
export class HomeModule { }
