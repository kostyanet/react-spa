import React, {Component}   from 'react';

import { AppStateService }  from '../../services/app-state.service.js';
import INIT_APP_STATE       from './InitAppState.js';

export default class AppState extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_APP_STATE;
        const self = this;

        AppStateService.deliver({
            appState:   self.state,
            setState:   self.setAppState.bind(self)
        });
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
