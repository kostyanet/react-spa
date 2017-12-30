import React                from 'react';

import AppStateService      from './app-state.service.js';
import getDisplayName       from './getDisplayName';


export default function withState(WrappedComponent) {
    class WithState extends React.Component {

        constructor(props) {
            super(props);

            this.handleChange = this.handleChange.bind(this);
            this.state = AppStateService.appState;
        }


        componentDidMount() {
            AppStateService.subscribe(this.handleChange);
        }


        componentWillUnmount() {
            AppStateService.unsubscribe(this.handleChange);
        }


        handleChange(state) {
            this.setState(state);
        }


        render() {
            const props = Object.assign({}, this.props, {
                appState: this.state,
                setAppState: AppStateService.mergeAppState
            });

            return <WrappedComponent {...props} />;
        }
    }

    WithState.displayName = `WithState(${getDisplayName(WrappedComponent)})`;

    return WithState;
}



