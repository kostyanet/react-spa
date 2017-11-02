import React, {Component}   from 'react';
import {withRouter}         from 'react-router-dom'

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
        let value  = target.value.trim();

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

        AuthService.login(creds, this.checkboxRef.checked)
            .then(res => this.onSuccess(res))
            .catch(err => this.onError(err));

        this.setState({isLoading: true});
    };


    onSuccess = res => {
        const p = this.props;
        this.setState({isLoading: false});

        p.setAppState({
            LoginPage:  {user: res}
        });

        setTimeout(() => { // simulates network delay
            p.history.push( p.appState.LoginPage.redirectUrl || '/users' );
        }, 1000);
    };


    onError = err => {
        const {message} = err;

        let obj = (/password/i.test(message))
            ? {passMsg: message, nameMsg: ''}
            : {nameMsg: message, passMsg: ''};

        this.setState(Object.assign({isLoading: false}, obj));
    };


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
