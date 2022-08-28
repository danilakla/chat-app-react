import {makeAutoObservable} from "mobx";

export default class Store {
    _isAuth;
    _user={};
    constructor() {
        makeAutoObservable(this)
    }


    authUser(isAuth) {
        this._isAuth = isAuth
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}
