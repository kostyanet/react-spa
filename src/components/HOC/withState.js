import React                from 'react';
import AppStateService      from '../../services/app-state.service.js';

export default function withState(WrappedComponent) {
    class WithState extends React.Component {

        constructor(props) {
            super(props);

            this.handleChange = this.handleChange.bind(this);
            this.state = AppStateService.appState;
            window.console.log(AppStateService.mergeAppState);
            this.setAppState = AppStateService.mergeAppState;
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
            return <WrappedComponent
                setAppState={this.setAppState} appState={this.state} {...this.props} />;
        }
    }

    WithState.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;

    return WithState;
}


function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
