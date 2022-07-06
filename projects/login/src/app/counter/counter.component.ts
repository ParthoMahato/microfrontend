import { Component, OnInit, OnDestroy } from '@angular/core';
import { State } from './store/counter.reducer'
import { Store, select } from '@ngrx/store';
import * as actions from './store/counter.actions';
import { getCounterH } from './store/counter.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  counter$!: Observable<number>;
  counterSubscription$!: Subscription;
  counterValue!: number;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.counter$ = this.store.pipe(select(getCounterH));
    this.counterSubscription$ = this.counter$.subscribe(value => {
      console.log("HOst" + value);
      this.counterValue = value;
    })
  }

  add() {
    this.store.dispatch(new actions.IncrementH(1));
  }

  subs() {
    this.store.dispatch(new actions.DecrementH(1));
  }
  ngOnDestroy() {
    this.counterSubscription$.unsubscribe();
  }

}
