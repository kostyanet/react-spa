import React            from 'react';
import PropTypes 	    from 'prop-types';

import withState        from '../../appState/withState.js';


class AppStatePage extends React.Component {

    handleClick = () => this.props.setAppState({});


    render() {
        this.props.appState.debug && window.console.log('AppStatePage has rendered');

        return (
            <div>
                <h2>The application state page</h2>
                <button onClick={this.handleClick}>Update state!</button>
                <small><small><pre>{JSON.stringify(this.props, null, 4)}</pre></small></small>
            </div>
        );
    }
}


AppStatePage.propTypes = {
    appState: PropTypes.object,
    setAppState: PropTypes.func
};


export default withState(AppStatePage)
