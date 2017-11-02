import React, {Component}    from 'react';
import { BrowserRouter,
    Redirect,
    Route, NavLink }        from 'react-router-dom';

import LoginContainer        from '../LoginPage/LoginContainer.jsx';

const App = (props) => (
    <BrowserRouter>
        <PrimaryLayout {...props} />
    </BrowserRouter>
);

const HomePage = () => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;
const UsersMenu = () => <div>Users Menu</div>;

const PrimaryLayout = (props) => (
    <div className="PrimaryLayout">
        <header>
            <h1>Welcome to our app!</h1>

            <nav>
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
                <NavLink to="/users" activeClassName="active">Users</NavLink>
                <NavLink to="/login" activeClassName="active">Log In</NavLink>
            </nav>

            <Route path="/users" component={UsersMenu}/>
        </header>

        <main>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/users" component={UsersPage}/>
            {/*<Redirect to="/auth" />*/}
            <LoginContainer {...props} />
        </main>
    </div>
);

export default App;
