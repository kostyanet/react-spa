import React, {Component}   from 'react';

import AppStateService      from '../../services/app-state.service.js';

export default class AppState extends Component {
    constructor(props, AppStateService) {
        super(props);
    }


    componentWillMount() {
        AppStateService.subscribe(this.setAppState);
    }


    setAppState = (updater, callback) => {
        this.setState(updater, () => {
            if (this.props.debug) {
                console.log('setAppState: ', JSON.stringify(this.state));
            }
            if (typeof callback === 'function') {
                callback();
            }
        });
    };


    render() {
        return (
            <div className='AppState'>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        appState: this.state,
                        setAppState: this.setAppState
                    });
                })}
            </div>
        );
    }
}
