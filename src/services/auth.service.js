// Authorization service
// 1) makes POST request to log in;
// 2) saves user into the LocalStorage;
// 3) handles http and parsing errors.


import axios                from 'axios';
import {withRouter}         from 'react-router-dom'
import AppValues            from '../misc/app.values.js';


class AuthService {
    constructor() {
        if (!AuthService.instance) {
            AuthService.instance = this;
        }

        return AuthService.instance;
    }


    login(creds, keepLogged) {
g
        return axios({
            method: 'post',
            url:    AppValues.BASE_URL + '/login',
            data:   creds
        })

            .then(data => {
                const user = data.data;
                window.localStorage.setItem('user', JSON.stringify(user));

                console.log('AuthService: successfully logged in.');
                return user;
            })

            .catch(data => {
                if (!data.response) {
                    console.error(`AuthService: ${data.stack}`);
                    throw new Error(`Unexpected Error: ${data.message}`);
                }

                const res = data.response;
                const err = res.data.error;

                console.error(`AuthService: ${res.status} ${res.statusText} - ${err}`);

                throw new Error(err);
            });
    }

}


const instance = new AuthService();
Object.freeze(instance);


export default instance;