import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../home.model';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent {
  @Input()
  addressList!: Address[];
  @Output() newAddress = new EventEmitter<void>();

  createNewAddress() {
    this.newAddress.emit();
  }
}
