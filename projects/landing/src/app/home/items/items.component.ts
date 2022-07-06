import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../home.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input()
  itemList!: Item[];
  @Output() addToCart = new EventEmitter<Item>();
  constructor() {}

  ngOnInit() {}

  addToCartItems(item: Item | undefined) {
    this.addToCart.emit(item);
  }
}
