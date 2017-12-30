import React, {Component}   from 'react';
import {
    Redirect, Route, NavLink,
}                           from 'react-router-dom';

import AppStateService      from '../../appState/app-state.service.js';

export default class PrivateRoute extends Component {
    componentWillMount() { debugger
        if (AppStateService.appState.model.user) {
            AppStateService.mergeAppState({
                view: { LoginPage: {returnUrl: this.props.location} }
            });
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={props =>
                ( AppStateService.appState.model.user
                    ? ( <Component {...props} /> )
                    : ( <Redirect to="/login" /> )
                )} />
        )
    }
}