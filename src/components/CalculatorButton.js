import React from 'react';
import PropTypes from 'prop-types';

import disableFocus from './DisableFocus';

export function CalculatorButton({value , onClick, onFocus, className}){
	return <button type="button" value={value} onClick={onClick} onFocus={onFocus} className={className}>{value}</button>;
}

CalculatorButton.propTypes = {
	className: PropTypes.string , 
	value: PropTypes.string , 
	onClick: PropTypes.func,
	onFocus: PropTypes.func
};

export default disableFocus(CalculatorButton);