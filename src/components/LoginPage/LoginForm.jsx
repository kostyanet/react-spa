import React        from 'react';

import Button       from '../common/Button.jsx';
import FormInput    from '../common/FormInput.jsx';


const LoginForm = props =>

    <div className="LoginForm">
        <h2>Login</h2>

        <form >
            <FormInput { ...props.nameProps} />
            <FormInput { ...props.passProps} />

            <Button { ...props.buttonProps} />
        </form>

    </div>;


export default LoginForm;