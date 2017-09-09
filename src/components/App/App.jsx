import React, {Component} 	from 'react';
import { BrowserRouter,
	Redirect,
	Route, NavLink }		from 'react-router-dom';

import LoginPage	 		from '../LoginPage/LoginPage.jsx';

const App = (props) => (
  <BrowserRouter>
    <PrimaryLayout {...props} />
  </BrowserRouter>
)

const HomePage =	() => <div>Home Page</div>
const UsersPage =	() => <div>Users Page</div>
const UsersMenu =	() => <div>Users Menu</div>

const PrimaryLayout = (props) => (
  <div className="PrimaryLayout">
    <header>
        <h1>Welcome to our app!</h1>

	    <nav>
	      <NavLink to="/" exact activeClassName="active">Home</NavLink>
	      <NavLink to="/users"  activeClassName="active">Users</NavLink>
	      <NavLink to="/login"  activeClassName="active">Log In</NavLink>
	    </nav>
      <Route path="/users" component={UsersMenu} />
    </header>

    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/login"  component={LoginPage} />
      <Route path="/users"  component={UsersPage} />
      {/*<Redirect to="/auth" />*/}
      <LoginPage {...props} />
    </main>
  </div>
)

export default App;
