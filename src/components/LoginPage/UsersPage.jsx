import React            from 'react';
import withState        from '../HOC/withState.js';

class UsersPage extends React.Component {
    render() {
        return <div>{JSON.stringify(this.props)}</div>
    }
}

export default withState(UsersPage)
