import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address, CartSummary } from '../../home.model';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  @Input()
  cartSummary!: CartSummary;
  @Input()
  addressList!: Address[];
  @Output() placeOrderNow = new EventEmitter<Address>();
  selectedAddress!: Address;

  ngOnInit() {
    this.selectedAddress = this.addressList[0];
  }

  placeOrder() {
    this.placeOrderNow.emit(this.selectedAddress);
  }

  updateDeliveryAddress(event: { target: { value: number; }; }) {
    console.log(event.target.value);
    this.selectedAddress = this.addressList.filter(
      address => address.address.pin === event.target.value
    )[0];
  }
}
