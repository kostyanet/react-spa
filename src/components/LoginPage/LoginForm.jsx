import React        from 'react';

import Button       from '../common/Button.jsx';
import Checkbox     from '../common/Checkbox.jsx';
import FormInput    from '../common/FormInput.jsx';


const LoginForm = props =>

    <div className="LoginForm">
        <h2>Login</h2>

        <form >
            <FormInput { ...props.nameProps} />
            <FormInput { ...props.passProps} />

            <Checkbox { ...props.checkboxProps} />
            <Button { ...props.buttonProps} />
        </form>

    </div>;


export default LoginForm;