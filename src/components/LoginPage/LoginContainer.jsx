import React, {Component}   from 'react';
import {withRouter}         from 'react-router-dom'

import AppValues            from '../../misc/app.values.js';
import LoginForm            from './LoginForm.jsx';
import _fetch               from '../../misc/_fetch.js';


class LoginContainer extends Component {

    _set(...args) {
        this.props.setAppState({
            LoginPage: Object.assign({}, this.props.appState.LoginPage, ...args)
        });
    }


    handleChange = e => {
        let target = e.target;
        let value = target.value;
        let state = this.props.appState.LoginPage;

        let obj = (target.type === 'text')
            ? {nameValue: value}
            : {passValue: value};

        this._set(obj, {status: 'touched', nameMsg: '', passMsg: ''});
    };


    handleSubmit = e => {
        e.preventDefault();
        let state = this.props.appState.LoginPage;

        const creds = JSON.stringify({
            username: state.nameValue,
            password: state.passValue
        });

        _fetch(creds, AppValues.BASE_URL + '/login')
            .then(this.onSuccess.bind(this))
            .catch(this.onError.bind(this));

        this._set({
            nameMsg: '',
            passMsg: '',
            status: 'pending'
        });
    }


    onSuccess() {
        console.log('Successfully logged.');

        this._set({
            nameMsg: '',
            passMsg: '',
            status: 'logged'
        });
        debugger
        setTimeout(() => {
            this.props.history.push('/users');
        }, 1000);

    }


    onError(err) {
        let msg = err.statusText;
        console.error(`Login error: ${err.code} - ${msg}`);

        let obj = (/password/i.test(msg))
            ? {passMsg: msg, nameMsg: ''}
            : {nameMsg: msg, passMsg: ''};

        this._set(obj, {status: 'error'});
    }


    render() {
        let state = this.props.appState.LoginPage;

        const nameProps = {
            handleChange: this.handleChange,
            message: state.nameMsg,
            placeholder: 'Username',
            required: true,
            type: 'text',
            value: state.nameValue
        };
        const passProps = {
            handleChange: this.handleChange,
            message: state.passMsg,
            placeholder: 'Password',
            required: true,
            type: 'password',
            value: state.passValue
        };
        const buttonProps = {
            disabled: state.status === 'pending',
            handleClick: this.handleSubmit,
            title: 'Login'
        };

        return (
            <LoginForm nameProps={nameProps} passProps={passProps} buttonProps={buttonProps}/>
        );
    }
}

export default withRouter(LoginContainer);