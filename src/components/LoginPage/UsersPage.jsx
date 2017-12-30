import React            from 'react';
import PropTypes 	    from 'prop-types';

import withState        from '../../appState/withState.js';

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(event) {
        this.props.setAppState({});
    }


    render() {
        window.console.log('UsersPage render')
        return (
            <div>
                <button onClick={this.handleClick}>Click on</button>
                <small style={{fontSize: '10px'}}><pre>{JSON.stringify(this.props, null, 2)}</pre></small>
            </div>
        );
    }
}

UsersPage.propTypes = {
    setAppState: PropTypes.func
};

export default withState(UsersPage)
