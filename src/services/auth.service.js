// Authorization service
// 1) makes POST request to log in;
// 2) saves user into the LocalStorage;
// 3) handles http and parsing errors.

import axios                from 'axios';

import { AppStateService }  from './app-state.service.js';
import AppValues            from '../misc/app.values.js';


class AuthService {
    constructor() {
        if (!AuthService.instance) {
            this._data = { user: {} };

            AuthService.instance = this;
        }

        return AuthService.instance;
    }


    get user() {
        return Object.assign({}, this._data.user);
    }


    login(creds, keepLogged) {
        window.localStorage.removeItem('user');

        return axios({
            method: 'post',
            url:    AppValues.BASE_URL + '/login',
            data:   creds
        })
            .then(_user => this._onSuccess(_user.data, keepLogged))
            .catch(_error => this._onError(_error));
    }


    _onSuccess(user, keepLogged) {
        AppStateService.setAppState({
            LoginPage:  {user}
        });

        AppStateService.appState.history.push('/users');

        keepLogged && window.localStorage.setItem('user', JSON.stringify(user));
        window.console.log('AuthService: successfully logged.');

        return user;
    }


    _onError(error) {
        if (!error.response) {
            window.console.error(`AuthService: ${error.stack}`);
            return error.message;
        }

        // todo: move to exception service
        let res = error.response;
        let err = res.data.error;

        window.console.error(`AuthService: ${res.status} ${res.statusText} - ${err}`);

        throw new Error(err);
    }

}

// manipulations for the singleton and its safety
const instance = new AuthService();
Object.freeze(instance);


export default instance;