import React, {Component}   from 'react';
import {withRouter}         from 'react-router-dom'

import AppValues            from '../../misc/app.values.js';
import LoginForm            from './LoginForm.jsx';
import _fetch               from '../../misc/_fetch.js';


class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameMsg: '',
            nameValue: '',
            passMsg: '',
            passValue: '',
            isLoading: false
        };
    }


    handleChange = e => {
        let target = e.target;
        let value = target.value;

        let obj = (target.type === 'text')
            ? {nameValue: value}
            : {passValue: value};

        this.setState(obj);
    };


    handleSubmit = e => {
        e.preventDefault();

        const creds = JSON.stringify({
            username: this.state.nameValue,
            password: this.state.passValue
        });

        _fetch(creds, AppValues.BASE_URL + '/login')
            .then(this.onSuccess.bind(this))
            .catch(this.onError.bind(this));

        this.setState({isLoading: true});
    };


    onSuccess(response) {
        console.log('Successfully logged.');

        this.props.setAppState({
            LoginPage:  {user: JSON.parse(response)}
        });

        this.setState({isLoading: false});

        setTimeout(() => {
            this.props.history.push( this.props.appState.LoginPage.redirectUrl || 'users' );
        }, 1000);
    }


    onError(err) {
        let msg = err.statusText;
        console.error(`Login error: ${err.code} - ${msg}`);

        let obj = (/password/i.test(msg))
            ? {passMsg: msg, nameMsg: ''}
            : {nameMsg: msg, passMsg: ''};

        this.setState(Object.assign(obj, {isLoading: false}));
    }


    render() {
        const s = this.state;
        const nameProps = {
            handleChange:   this.handleChange,
            message:        s.nameMsg,
            placeholder:    'Username',
            required:       true,
            type:           'text',
            value:          s.nameValue
        };
        const passProps = {
            handleChange:   this.handleChange,
            message:        s.passMsg,
            placeholder:    'Password',
            required:       true,
            type:           'password',
            value:          s.passValue
        };
        const buttonProps = {
            disabled:       s.isLoading,
            handleClick:    this.handleSubmit,
            title:          'Login'
        };

        return <LoginForm nameProps={nameProps} passProps={passProps} buttonProps={buttonProps}/>
    }
}

export default withRouter(LoginContainer);