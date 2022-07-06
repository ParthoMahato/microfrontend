import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import * as fromApp from '../../store/app.reducer';
import { OrderSummary } from '../home.model';
import * as HomeActions from './store/orders.actions';
import { selectLoading, selectOrders } from './store/orders.selectors';
import * as fromOrder from './store/orders.reducer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList!: OrderSummary[];
  isLoading: boolean = true;
  constructor(private store: Store<fromOrder.State>) {}

  ngOnInit() {
    this.store.dispatch(HomeActions.fetchOrdersStart());
    this.store.select(selectOrders).subscribe(value => {
      this.orderList = value;
    });

    this.store.select(selectLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
