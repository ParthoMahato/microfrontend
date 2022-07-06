import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Address } from '../home.model';
import * as HomeActions from './store/address.actions';
import { selectAddress, selectLoading, selectPinCodeSummary } from './store/address.selectors';
import * as fromAddress from './store/address.reducer';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;
  areas!: string[];
  disabledFlag: boolean = true;
  addressList!: Address[];
  addressCreationMode: boolean = false;
  isLoading:boolean = false;

  get additionalAddressControls() {
    return (this.addressForm.get('address.addressLine') as FormArray).controls;
  }

  constructor(private store: Store<fromAddress.State>) {}

  ngOnInit() {
    this.store.dispatch(HomeActions.fetchAddressStart());
    this.initialForm();
    this.fetchPinCodeDetails();
    this.store.select(selectAddress).subscribe(address => {
      this.addressList = address;
    });
    this.store.select(selectLoading).subscribe(loading => {
      this.isLoading = loading;
    });

  }

  initialForm() {
    let additionalAddress = new FormArray([]);
    this.addressForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
      address: new FormGroup({
        area: new FormControl('', Validators.required),
        pin: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(6),
          Validators.maxLength(6)
        ]),
        addressLine: additionalAddress,
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required)
      })
    });
  }

  fetchPinCodeDetails() {
    this.addressForm
      .get('address.pin')!
      .valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store.dispatch(
          HomeActions.fetchPinCodeDetailsStart({ pin: +value })
        );
      });

    this.store.select(selectPinCodeSummary).subscribe(summary => {
      if (!!summary) {
        this.areas = summary.area;
        this.addressForm.get('address.state')!.patchValue(summary.state);
        this.addressForm.get('address.city')!.patchValue(summary.city);
      }
    });
  }

  addNewAddressLine() {
    (<FormArray>this.addressForm.get('address.addressLine')).push(
      new FormGroup({
        addressLine: new FormControl('', Validators.required)
      })
    );
  }
  onSubmit() {
    let listOfAddress: Address[] = [];
    listOfAddress = [...this.addressList, this.addressForm.value];
    this.store.dispatch(
      HomeActions.saveAddressStart({ listOfAddress: listOfAddress })
    );
    this.onReset();
    this.addressCreationMode = false;
  }

  createNewAddress() {
    this.addressCreationMode = true;
  }

  onReset() {
    this.addressForm.reset();
  }
}
