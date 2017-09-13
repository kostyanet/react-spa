// Authorization service
// Makes POST request to log in, sets AppState, saves into LocalStorage

import axios                from 'axios';
import {withRouter}         from 'react-router-dom'

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
        return this._data.user;
    }


    login(creds, keepLogged) {

        return axios({
            method: 'post',
            url:    AppValues.BASE_URL + '/login',
            data:   creds
        })
            .then(data => {
                AppStateService.setAppState({
                    LoginPage:  {user: data.data}
                });

                // todo: Save into LocalStore

                console.log('AuthService: successfully logged.');
                return data.data;
            })

            .catch(data => { debugger
                if (!data.response) {
                    console.error(`AuthService: ${data.stack}`);
                    return data.message;
                }

                let res = data.response;
                let err = res.data.error;

                console.error(`AuthService: ${res.status} ${res.statusText} - ${err}`);

                throw new Error(err);
                //return err;
            });
    }

}

// manipulations for the singleton and its safety
const instance = new AuthService();
Object.freeze(instance);


export default instance;