import React, { Component } from 'react';

import ResultPanel from './components/ResultPanel';
import './App.css';

const initialState = { prevResult: 0, result: 0, operator: '', summary: '' };

class App extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.onDigitClick = this.onDigitClick.bind(this);
		this.onClearClick = this.onClearClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onOperatorClick = this.onOperatorClick.bind(this);
		this.onEqualClick = this.onEqualClick.bind(this);
	}

	onClearClick() {
		this.setState(initialState);
	}

	onDigitClick(e) {
		const { value } = e.target;
		this.addDigit(value);
	}

	addDigit(value) {
		this.setState(prevState => {
			const result = prevState.operator !== '' ? 0 : prevState.result;
			return {
				result: result * 10 + parseInt(value)
			};
		});
	}

	onKeyPress(e) {
		if (e.key >= 0 && e.key <= 9) {
			this.addDigit(e.key);
		} else if (['-', '+', '/', '*'].includes(e.key)) {
			this.setOperator(e.key);
		} else if (e.key === '=' /*|| e.key === 'Enter'*/) {
			this.setResult();
		}
	}

	onOperatorClick(e) {
		const { value } = e.target;
		this.setOperator(value);
	}

	setOperator(operator) {
		this.setState(prevState => ({
			operator,
			summary: `${prevState.summary} ${prevState.result} ${operator}`,
			prevResult: prevState.result
		}));
	}

	onEqualClick() {
		this.setResult();
	}

	setResult() {
		this.setState(prevState => ({
			...initialState, result: eval(`${prevState.prevResult}  ${prevState.operator}  ${prevState.result}`)
		}));
	}

	render() {
		const { result, summary } = this.state;
		return (
			<div className="App" onKeyPress={this.onKeyPress}>
				<ResultPanel className="result" summary={summary} result={result}/>
				<button type="button" onClick={this.onClearClick} className="clear_result">Clear</button>
				<button type="button" value="-" onClick={this.onOperatorClick} className="operator">-</button>
				<button type="button" value="7" onClick={this.onDigitClick} className="digit">7</button>
				<button type="button" value="8" onClick={this.onDigitClick} className="digit">8</button>
				<button type="button" value="9" onClick={this.onDigitClick} className="digit">9</button>
				<button type="button" value="/" onClick={this.onOperatorClick} className="operator">/</button>
				<button type="button" value="4" onClick={this.onDigitClick} className="digit">4</button>
				<button type="button" value="5" onClick={this.onDigitClick} className="digit">5</button>
				<button type="button" value="6" onClick={this.onDigitClick} className="digit">6</button>
				<button type="button" value="*" onClick={this.onOperatorClick} className="operator">*</button>
				<button type="button" value="1" onClick={this.onDigitClick} className="digit">1</button>
				<button type="button" value="2" onClick={this.onDigitClick} className="digit">2</button>
				<button type="button" value="3" onClick={this.onDigitClick} className="digit">3</button>
				<button type="button" value="+" onClick={this.onOperatorClick} className="operator">+</button>
				<button type="button" value="0" onClick={this.onDigitClick} className="digit">0</button>
				<button type="button" className="digit">.</button>
				<button type="button" onClick={this.onEqualClick} className="equal">=</button>
			</div>
		);
	}
}

export default App;
