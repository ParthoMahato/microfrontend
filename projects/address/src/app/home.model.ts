export class Item {
  public id: number;
  public image: string;
  public category: string;
  public title: string;
  public amount: number;
  public qty: string;
  public orderedQty: number;

  constructor(
    id: number,
    image: string,
    category: string,
    title: string,
    amount: number,
    qty: string,
    orderedQty: number
  ) {
    this.id = id;
    this.image = image;
    this.category = category;
    this.title = title;
    this.amount = amount;
    this.qty = qty;
    this.orderedQty = orderedQty;
  }
}

export class Calculation {
  gst!: number;
  deliveryCharge!: number;
}

export class CartSummary {
  constructor(
    public gst: number,
    public deliveryCharge: number,
    public totalItem: number,
    public total: number,
    public finalPrice: number
  ) {}
}

export class PinCodeSummary {
  constructor(
    public area: string[],
    public state: string,
    public city: string
  ) {}
}

export class Address {
  name!: string;
  phone!: number;
  address!: {
    pin: number;
    area: string;
    addressLine: { addressLine: string; }[];
    state: string;
    city: string;
  };
}

export class OrderSummary {
  constructor(
    public cartItems: Item[],
    public cartSummary: CartSummary,
    public orderOn: Date,
    public ordereNumber: string,
    public address: Address
  ) {}
}
