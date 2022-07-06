import { Actions, ActionTypes } from './counter.actions';
export interface State {
    counter: number
}

export const initialState: State = {
    counter: 0
}

export function hostCounterReducer(state = initialState, action: Actions){
    switch (action.type) {
        case ActionTypes.INCREMENTH:
            return {
                ...state,
                counter: state.counter + action.payload
            }

        case ActionTypes.DECREMENTH:
            return {
                ...state,
                counter:  state.counter - action.payload
            }
        default:
            return initialState;
    }
}