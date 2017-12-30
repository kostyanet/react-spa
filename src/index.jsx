import React            from 'react';
import ReactDOM         from 'react-dom';

import App              from './components/App/App.jsx';
import AppStateService  from './appState/app-state.service.js';

import '../styles/application.sass';


AppStateService.initAppState();


ReactDOM.render(
    <App />,
    document.getElementById('app-root')
);
