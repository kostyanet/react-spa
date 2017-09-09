import React 	from 'react';
import ReactDOM from 'react-dom';

import App 		from './components/App/App.jsx';
import AppState from './components/App/AppState.jsx';

import '../styles/application.sass';

ReactDOM.render(
  <AppState debug>
    <App />
  </AppState>,
  
  document.getElementById('app-root')
);
