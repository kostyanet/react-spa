import React                from 'react';
import {
    Router, Route, NavLink,
}                           from 'react-router-dom';
import PropTypes 	        from 'prop-types';

import LoginContainer       from '../LoginPage/LoginContainer.jsx';
import PrivateRoute         from './PrivateRoute.jsx';

const App = (props) => (
    <Router history={props.appState.history}>
        <PrimaryLayout {...props} />
    </Router>
);

const HomePage = () => <div>Home Page</div>;
const ProtectedPage = () => <div>Protected content</div>;
const UsersMenu = () => <div>Users Menu</div>;

const PrimaryLayout = (props) => (
    <div className="PrimaryLayout">
        <header>
            <h1>Welcome to our app!</h1>

            <nav className="nav-bar">
                <NavLink to="/" exact activeClassName="active">Public</NavLink>
                <NavLink to="/protected" activeClassName="active">Protected</NavLink>
                <NavLink to="/login" activeClassName="active">Log In</NavLink>
            </nav>
            <Route path="/users" component={UsersMenu}/>
        </header>

        <main>
            <Route path="/" exact component={HomePage}/>
            {/*<Route path="/users" component={UsersPage}/>*/}
            <Route path="/login" component={LoginContainer}/>
            <PrivateRoute path="/protected" component={ProtectedPage}/>{/*<Redirect to="/auth" />*/}
            {/*<LoginContainer {...props} />*/}
        </main>
    </div>
);


App.propTypes = {
    appState: PropTypes.object
};

export default App;
