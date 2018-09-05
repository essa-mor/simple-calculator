import React from 'react';

function disable(e){
	e.target.blur();
}

function disableFocus(Component) {
	return function(props){
		return <Component {...props} onFocus={disable}/>;
	};
}

export default disableFocus;