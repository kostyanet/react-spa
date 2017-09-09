import React 		from 'react';
import classNames 	from 'classnames';
import PropTypes 	from 'prop-types';

const FormInput = props =>

	<label className={classNames("FormInput", {"error": props.message} )} >
	
		<div>{props.message}</div>

		<input type={props.type} placeholder={props.placeholder}
			onChange={props.handleChange} value={props.value} 
			required={props.required} />

	</label>

FormInput.propTypes = {
  	handleChange:   PropTypes.func.isRequired,
  	message: 		PropTypes.string,
	placeholder: 	PropTypes.string,
  	required: 		PropTypes.any,
  	type: 			PropTypes.string,
    value: 			PropTypes.string.isRequired
};

FormInput.defaultProps = {
	message: 		'',
	placeholder: 	'',
  	required: 		undefined,
  	type: 			'text',
};

export default FormInput;
