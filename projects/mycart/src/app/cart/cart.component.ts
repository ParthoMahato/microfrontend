import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  Address,
  Calculation,
  CartSummary,
  Item,
  OrderSummary
} from '../home.model';

import {
  selectAddress,
  selectCalculation,
  selectCartItems,
  selectLoading,
  selectOrders
} from './store/cart.selectors';
import * as HomeActions from './store/cart.actions';
import { take } from 'rxjs/operators';
import * as fromCart from './store/cart.reducer';

@Component({
  selector: 'cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Item[] = [];
  calculationDetails!: Calculation;
  cartSummary!: CartSummary;
  isLoading: boolean = false;
  addressList!: Address[];
  modifiedCartItems!: Item[];
  constructor(private store: Store<fromCart.State>) {}

  ngOnInit() {
    this.store.dispatch(HomeActions.fetchCartItemsStart());
    this.store.dispatch(HomeActions.fetchAddressStart());

    this.store.select(selectCartItems).subscribe(value => {
      this.cartItems = value;
      this.store.select(selectCalculation).subscribe(cal => {
        if (Object.keys(cal).length === 0) {
          this.store.dispatch(HomeActions.fetchCalculationStart());
        } else {
          this.calculationDetails = { ...cal };
          this.calculation(this.cartItems);
        }
      });
    });

    this.store.select(selectAddress).subscribe(address => {
      this.addressList = address;
    });

    this.store.select(selectLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  calculation(cartItems: Item[]) {
    this.modifiedCartItems = [...cartItems];
    let total = cartItems.reduce((sum, item) => {
      return sum + item.orderedQty * item.amount;
    }, 0);
    let orderedQty = cartItems.reduce((sum, item) => {
      return sum + item.orderedQty;
    }, 0);

    let gst = total * (this.calculationDetails.gst / 100);

    let finalPrice = total + gst + this.calculationDetails.deliveryCharge;

    this.cartSummary = new CartSummary(
      +gst.toFixed(2),
      this.calculationDetails.deliveryCharge,
      orderedQty,
      total,
      +finalPrice.toFixed(2)
    );
  }

  onDelete(deletedIndex: number) {
    let updatedItems = this.cartItems.filter(
      (value, index) => index != deletedIndex
    );
    this.store.dispatch(
      HomeActions.deleteCartItemStart({ item: updatedItems })
    );
  }
  placeOrder(address: Address) {
    let modifiedOrders: OrderSummary[] = [];
    this.store
      .select(selectOrders)
      .pipe(take(1))
      .subscribe(orders => {
        modifiedOrders = [...orders];
        let orderPlaced = new OrderSummary(
          this.modifiedCartItems,
          this.cartSummary,
          new Date(),
          'ORDER-' + (Math.random() * 1000000).toFixed(0),
          address
        );
        modifiedOrders.push(orderPlaced);
      });

    this.store.dispatch(
      HomeActions.saveOrderStart({ orderSummary: modifiedOrders })
    );
  }
}
