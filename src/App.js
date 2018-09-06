import React, { Component } from 'react';

import ResultPanel from './components/ResultPanel';
import CalculatorButton from './components/CalculatorButton';
import {
	initialState,
	fraction_symbol,
	addDigitReducer,
	setOperatorReducer,
	setResultReducer,
	setFractionReducer,
	doBackspaceReducer
} from './CalculatorReducer';

import './App.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.onDigitClick = this.onDigitClick.bind(this);
		this.onClearClick = this.onClearClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onOperatorClick = this.onOperatorClick.bind(this);
		this.setResult = this.setResult.bind(this);
		this.setFraction = this.setFraction.bind(this);
		this.doBackspace = this.doBackspace.bind(this);
	}

	onClearClick() {
		this.setState(initialState);
	}

	onDigitClick(e) {
		const { value } = e.target;
		this.addDigit(value);
	}

	addDigit(value) {
		this.setState(prevState => addDigitReducer(prevState, value));
	}

	onKeyDown(e) {
		if (e.key >= 0 && e.key <= 9) {
			this.addDigit(e.key);
		} else if (['-', '+', '/', '*'].includes(e.key)) {
			this.setOperator(e.key);
		} else if (e.key === '=' || e.key === 'Enter') {
			this.setResult();
		} else if (e.key === fraction_symbol) {
			this.setFraction();
		} else if (e.key === 'Backspace') {
			this.doBackspace();
		}
	}

	onOperatorClick(e) {
		const { value } = e.target;
		this.setOperator(value);
	}

	setOperator(operator) {
		this.setState(prevState => setOperatorReducer(prevState, operator));
	}

	setResult() {
		const { operator } = this.state;
		this.setState(prevState => setResultReducer(prevState, operator));
	}

	setFraction() {
		this.setState(prevState => setFractionReducer(prevState));
	}

	doBackspace() {
		this.setState(prevState => doBackspaceReducer(prevState));
	}

	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown);
	}

	render() {
		const { displayedNumber, summary } = this.state;
		return (
			<div className="App">
				<ResultPanel className="result" summary={summary} result={displayedNumber} />
				<CalculatorButton value="Clear" onClick={this.onClearClick} className="clear_result" />
				<CalculatorButton value="←" onClick={this.doBackspace} className="digit" />
				<CalculatorButton value="-" onClick={this.onOperatorClick} className="operator" />
				<CalculatorButton value="7" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="8" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="9" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="/" onClick={this.onOperatorClick} className="operator" />
				<CalculatorButton value="4" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="5" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="6" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="*" onClick={this.onOperatorClick} className="operator" />
				<CalculatorButton value="1" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="2" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="3" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="+" onClick={this.onOperatorClick} className="operator" />
				<CalculatorButton value="0" onClick={this.onDigitClick} className="digit" />
				<CalculatorButton value="." onClick={this.setFraction} className="digit" />
				<button type="button" onClick={this.setResult} className="equal">=</button>
			</div>
		);
	}
}

export default App;
