import React from 'react';

function disable(e){
	e.target.blur();
}

function withDisableFocus(Component) {
	return function(props){
		return <Component {...props} onFocus={disable}/>;
	};
}

export default withDisableFocus;