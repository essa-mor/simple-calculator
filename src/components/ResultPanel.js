import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ResultPanel.css';

class ResultPanel extends PureComponent {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	render() {
		const { summary, result, className } = this.props;
		return (<div className={className}>
			<div className="box  ellipsis  reverse-ellipsis"><span className="result_label">{summary}</span></div>
			<input type="text" ref={this.textInput} value={isFinite(result) ? result : 'Can\'t devide by zero'} className="result_input" readOnly />
		</div>);
	}
}

ResultPanel.propTypes = {
	summary: PropTypes.string, 
	result: PropTypes.string, 
	className: PropTypes.string
};

export default ResultPanel;