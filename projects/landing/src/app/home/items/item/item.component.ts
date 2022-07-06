import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../home.model';

@Component({
  selector: 'cart-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input()
  item!: Item;
  @Output() addToCart = new EventEmitter<Item>();

  toCart(item: Item | undefined) {
    this.addToCart.emit(item);
  }

  getColor(){
    return `${this.item.category} 1px 1px 3px 1px`;
  }

  getBtnColor(){
    return `${this.item.category}`;
  }
}
