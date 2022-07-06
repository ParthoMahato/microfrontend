import { createAction, props } from '@ngrx/store';

// Setup global store
export const INCREMENT = "[Shell Page] increment";
export const DECREMENT = "[Shell Page] decrement";
export const LOGOUT = '[Login Page] logout';


export const increment = createAction(INCREMENT, props<{ add: number }>());
export const decrement = createAction(DECREMENT, props<{ sub: number }>());
export const logout = createAction(LOGOUT);
