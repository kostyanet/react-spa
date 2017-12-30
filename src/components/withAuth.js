import React                from 'react';

import AppStateService      from '../appState/app-state.service.js';
import getDisplayName       from '../appState/getDisplayName';


const UnauthPage = props =>
    <h2>Please <small><a className="link" onClick={props.handleClick}>Log In</a></small> to see this page</h2>;


export default function withAuth(WrappedComponent) {
    class WithAuth extends React.Component {

        _isLogged;


        componentWillMount() {
            this._isLogged = !!AppStateService.appState.model.user;

            if (!AppStateService.appState.model.user) {
                AppStateService.mergeAppState({
                    view: { LoginPage: {returnUrl: this.props.location.pathname} }
                });
            }
        }


        handleClick = () => {
            this.props.history.push('/login');
        };


        render() {
            return this._isLogged
                ? <WrappedComponent {...this.props} />
                : <UnauthPage handleClick={this.handleClick} />
        }
    }

    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuth;
}
