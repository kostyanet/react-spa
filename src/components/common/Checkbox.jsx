import React 		from 'react';
import PropTypes 	from 'prop-types';


const Checkbox = props =>

    <div className="Checkbox">
        <input type="checkbox" ref={props.checkboxRef} />
        {props.text}
    </div>;


Checkbox.propTypes = {
    text:    		PropTypes.string,
    checkboxRef: 	PropTypes.any
};


export default Checkbox;