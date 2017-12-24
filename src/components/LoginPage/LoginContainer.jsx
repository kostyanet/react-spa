import React, {Component}   from 'react';
import axios                from 'axios';
import {withRouter}         from 'react-router-dom'

import AppValues            from '../../misc/app.values.js';
import AuthService          from '../../services/auth.service.js';
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
            username: this.state.nameValue.trim(),
            password: this.state.passValue.trim()
        };

        AuthService.login(creds, this.checkboxRef.checked)
            .then(response => { this.setState({isLoading: false}) })
            .catch(err => { this.onError(err) });

        this.setState({isLoading: true});
    };


    onSuccess(response) {
        this.setState({isLoading: false});

        setTimeout(() => { // simulates network delay
            this.props.history.push( this.props.appState.LoginPage.redirectUrl || 'users' );
        }, 1000);
    }


    onError(err) { debugger
        let msg = err.message;

        let obj = (/password/i.test(msg))
            ? {passMsg: msg, nameMsg: ''}
            : {nameMsg: msg, passMsg: ''};

        this.setState(Object.assign({isLoading: false}, obj));
    }


    render() {
        const nameProps = {
            handleChange:   this.handleChange,
            message:        this.state.nameMsg,
            placeholder:    'Username',
            required:       true,
            type:           'text',
            value:          this.state.nameValue
        };
        const passProps = {
            handleChange:   this.handleChange,
            message:        this.state.passMsg,
            placeholder:    'Password',
            required:       true,
            type:           'password',
            value:          this.state.passValue
        };
        const checkboxProps = {
            checkboxRef:    el => this.checkboxRef = el,
            text:           'Keep me logged'
        };
        const buttonProps = {
            disabled:       this.state.isLoading,
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
