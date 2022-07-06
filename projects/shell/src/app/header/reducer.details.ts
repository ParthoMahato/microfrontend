import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
    user: User;
    errorMsg: string;
    loading: boolean;
}
export const storeName = "login-reducer";
const getLoginState = createFeatureSelector<State>(storeName);

export const selectUser = createSelector(
    getLoginState,
    (state: State) => state.user
);

export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
/*********************************************************************/