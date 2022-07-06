import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../home.model';

@Component({
  selector: 'cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemscomponent {
  @Input()
  cartItems!: Item[];
  @Output() updateCalculation = new EventEmitter<Item[]>();
  @Output() delete = new EventEmitter<number>();

  onQuantityChange(event: { target: { value: string | number; }; }, index: number) {
    let editedItem = {
      ...this.cartItems[index],
      orderedQty: +event.target.value
    };

    let updatedItems = [...this.cartItems];
    updatedItems[index] = editedItem;
    this.cartItems = updatedItems;
    this.updateCalculation.emit(this.cartItems);
  }

  onDelete(index: number) {
    this.delete.emit(index);
  }
  getColor(item:Item){
    return `${item.category} 0px 1px 2px 1px`
  }
}
