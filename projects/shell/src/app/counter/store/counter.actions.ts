import { createAction, props, Action } from '@ngrx/store'

export enum ActionTypes {
    INCREMENTH = "[Counter Page] increment H",
    DECREMENTH = "[Counter Page] decrement H"
}

export class IncrementH implements Action {
    public readonly type = ActionTypes.INCREMENTH;
    constructor(public payload: number) { }
}

export class DecrementH implements Action {
    public readonly type = ActionTypes.DECREMENTH;
    constructor(public payload: number) { }
}

export type Actions = IncrementH | DecrementH;