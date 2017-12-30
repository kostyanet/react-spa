import React            from 'react';
import PropTypes 	    from 'prop-types';

import withState        from '../../appState/withState.js';


class LogoutPage extends React.Component {

    handleClick = () => this.props.setAppState({
        model:  {
            user: null
        },
        view:   {
            LoginPage: {state: 'logged out'}
        }
    }, this.onLogOut);


    onLogOut = () => this.props.history.push('/');


    render() {
        return (
            <div>
                <h2>You may want to Log Out:</h2>
                <button onClick={this.handleClick}>Log Out</button>
            </div>
        );
    }
}


LogoutPage.propTypes = {
    setAppState: PropTypes.func
};


export default withState(LogoutPage)
