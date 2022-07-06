import { createReducer, on } from '@ngrx/store';
import * as ShellActions from './shell.actions';

export interface State {
    counter: number
}

export const initialState: State = {
    counter: 0
}

export const hostReducer = createReducer(
    initialState,
    on(ShellActions.increment, (state, actionData) => ({
        ...state,
        counter: state.counter + actionData.add
    })),
    on(ShellActions.decrement, (state, actionData) => ({
        ...state,
        counter: state.counter - actionData.sub
    }))
)