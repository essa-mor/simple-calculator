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
			<span className="result_label">{summary}</span>
			<input type="text" ref={this.textInput} value={result} className="result_input" readOnly />
		</div>);
	}
}

ResultPanel.propTypes = {
	summary: PropTypes.string, 
	result: PropTypes.string, 
	className: PropTypes.string
};

export default ResultPanel;