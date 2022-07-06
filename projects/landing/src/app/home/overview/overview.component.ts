import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Item } from '../home.model';
import * as fromLanding from '../store/landing.reducer'

import {
  selectAllItems,
  selectCartItems,
  selectLoading,
} from '../store/landing.selectors';
import * as HomeActions from '../store/landing.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  itemList!: Item[];
  category: string[] = [];
  private itemSub: Subscription | undefined;
  isLoading: boolean = false;

  constructor(
    private store: Store<fromLanding.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(HomeActions.fetchItemsStart());
    this.store
      .select(selectAllItems)
      .pipe(filter((allItems: any) => !!allItems))
      .subscribe(items => {
        this.itemList = items;
        this.itemList.map(item => {
          if (!this.category.includes(item.category)) {
            this.category.push(item.category);
          }
        });
      });

    this.store.select(selectLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  addToCartHome(item: Item) {
    this.store
      .select(selectCartItems)
      .pipe(take(1))
      .subscribe((cartItems: Item[]) => {
        let existingItem = false;
        cartItems = cartItems.map((value: Item) => {
          if (value.id == item.id) {
            existingItem = true;
            return { ...value, orderedQty: value.orderedQty + 1 };
          } else {
            return value;
          }
        });
        let modifiedCartItems = [...cartItems];
        if (!existingItem) modifiedCartItems.push({ ...item, orderedQty: 1 });
        this.store.dispatch(
          HomeActions.addToCartStart({ modifiedCartItems: modifiedCartItems })
        );
      });
  }
}
