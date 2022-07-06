import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './counter.reducer';

export const storeName = "host-reducer";
const getAppState = createFeatureSelector <State>(storeName);
export const getCounterH = createSelector(getAppState, state => state.counter);