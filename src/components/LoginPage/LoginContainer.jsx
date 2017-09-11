import React, {Component}   from 'react';
import axios                from 'axios';
import {withRouter}         from 'react-router-dom'

import AppValues            from '../../misc/app.values.js';
import LoginForm            from './LoginForm.jsx';


class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkboxElement:    null,
            nameMsg:            '',
            nameValue:          '',
            passMsg:            '',
            passValue:          '',
            isLoading:          false
        };
    }


    handleChange = e => {
        let target = e.target;
        let value  = target.value;

        let obj = (target.type === 'text')
            ? {nameValue: value}
            : {passValue: value};

        this.setState(Object.assign({
            nameMsg:    '',
            passMsg:    ''
        }, obj));
    };


    handleSubmit = e => {
        e.preventDefault();

        let creds = {
            username: this.state.nameValue,
            password: this.state.passValue
        };

        axios({
            method: 'post',
            url:    AppValues.BASE_URL + '/login',
            data:   creds
        })
            .then(this.onSuccess.bind(this))
            .catch(this.onError.bind(this));

        this.setState({isLoading: true});
    };


    onSuccess(response) {
        console.log('Successfully logged.');

        this.props.setAppState({
            LoginPage:  {user: response.data}
        });

        this.setState({isLoading: false});

        setTimeout(() => {
            this.props.history.push( this.props.appState.LoginPage.redirectUrl || 'users' );
        }, 1000);
    }


    onError(err) {
        let res = err.response;
        let msg = res.data.error;
        console.error(`Login error: ${res.status} - ${res.statusText} - ${msg}`);

        let obj = (/password/i.test(msg))
            ? {passMsg: msg, nameMsg: ''}
            : {nameMsg: msg, passMsg: ''};

        this.setState(Object.assign({isLoading: false}, obj));
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
        const checkboxProps = {
            checkboxRef:    el => this.checkboxRef = el,
            text:           'Keep me logged'
        };
        const buttonProps = {
            disabled:       s.isLoading,
            handleClick:    this.handleSubmit,
            title:          'Login'
        };

        return <LoginForm
            nameProps={nameProps}
            passProps={passProps}
            checkboxProps={checkboxProps}
            buttonProps={buttonProps} />
    }
}

export default withRouter(LoginContainer);
