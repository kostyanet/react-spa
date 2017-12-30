import React                from 'react';
import {
    Router, Route, NavLink,
}                           from 'react-router-dom';

import AppStatePage         from '../Pages/AppStatePage.jsx';
import AppStateService      from '../../appState/app-state.service.js';
import LoginContainer       from '../Pages/LoginContainer.jsx';
import LogoutPage           from '../Pages/LogoutPage.jsx';
import withAuth             from '../withAuth';


const App = () => (
    <Router history={AppStateService.appHistory}>
        <PrimaryLayout />
    </Router>
);


const ProtectedPage = () => <div><h2>Protected content</h2></div>;


const PrimaryLayout = () => (
    <div className="PrimaryLayout">
        <header>
            <h1>Welcome to our app!</h1>

            <nav className="nav-bar">
                <NavLink to="/" exact activeClassName="active">AppState</NavLink>
                <NavLink to="/protected" activeClassName="active">Protected</NavLink>

                {AppStateService.appState.model.user ? (
                    <NavLink to="/logout" activeClassName="active">Log Out</NavLink>
                ) : (
                    <NavLink to="/login" activeClassName="active">Log In</NavLink>
                )}
            </nav>
        </header>

        <main>
            <Route path="/" exact component={AppStatePage}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/logout" component={LogoutPage}/>
            <Route path="/protected" component={withAuth(ProtectedPage)}/>
        </main>
    </div>
);


export default App;
