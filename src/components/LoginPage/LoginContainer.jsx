import React, {Component}   from 'react';

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


    handleChange = event => {
        let obj = (event.target.type === 'text')
            ? {nameValue: event.target.value}
            : {passValue: event.target.value};

        this.setState(Object.assign({
            nameMsg:    '',
            passMsg:    ''
        }, obj));
    };


    handleSubmit = event => {
        event.preventDefault();

        let creds = {
            username: this.state.nameValue.trim(),
            password: this.state.passValue.trim()
        };

        AuthService.login(creds, this.checkboxRef.checked)
            .catch(err => this.onError(err))
            // todo remove completely later
            // .finally(() => setTimeout(() => this.setState({isLoading: false}), 1000));

        this.setState({isLoading: true});
    };


    onError(err) {
        let obj = (/password/i.test(err.message))
            ? {passMsg: err.message, nameMsg: ''}
            : {nameMsg: err.message, passMsg: ''};

        this.setState(obj);
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

export default LoginContainer;
