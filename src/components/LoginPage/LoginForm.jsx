import React        from 'react';
import PropTypes 	from 'prop-types';

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


LoginForm.propTypes = {
    buttonProps:    PropTypes.object,
    checkboxProps:  PropTypes.object,
    nameProps:      PropTypes.object,
    passProps:      PropTypes.object
};

export default LoginForm;