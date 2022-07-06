import { Address, Calculation, Item, OrderSummary, PinCodeSummary, User } from './shell.model';

export interface ShellState {
    counter: number
}

export interface LoginState {
    user: User;
    errorMsg: string;
    loading: boolean;
}

export interface LandingState {
    allItems: Item[];
    cartItems: Item[];
  }

  export interface CartState {
    allItems: Item[];
    cartItems: Item[];
    calculation: Calculation;
    isLoading: boolean;
    pinCodeSummary: PinCodeSummary;
    addressList: Address[];
    ordersList: OrderSummary[];
  }

  export interface OrdersState {
    ordersList: OrderSummary[];
    isLoading: boolean;
  }

  export interface AddressState {
    pinCodeSummary: PinCodeSummary;
    addressList: Address[];
    isLoading: boolean;
  }

  