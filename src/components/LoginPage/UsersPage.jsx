import React            from 'react';
import PropTypes 	    from 'prop-types';

import withState        from '../../appState/withState.js';


class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.setAppState({});
    }


    render() {
        this.props.appState.debug && window.console.log('UsersPage render');

        return (
            <div>
                <button onClick={this.handleClick}>Click on</button>
                <small><small><pre>{JSON.stringify(this.props, null, 2)}</pre></small></small>
            </div>
        );
    }
}


UsersPage.propTypes = {
    appState: PropTypes.object,
    setAppState: PropTypes.func
};


export default withState(UsersPage)
