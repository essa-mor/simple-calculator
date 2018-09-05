import React, { Component } from 'react';

import ResultPanel from './components/ResultPanel';
import CalculatorButton from './components/CalculatorButton';

import './App.css';

const initialState = { prevDisplayedNumber: '0', override: true, displayedNumber: '0', operator: '', summary: '' };
const fraction_symbol = '.';

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
		this.setState(prevState => {
			const prevDisplayedNumber = prevState.override ? '' : prevState.displayedNumber;
			return { displayedNumber: `${prevDisplayedNumber}${value}`, override: false };
		});
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
		this.setState(prevState => {
			const prevOperator = prevState.operator;
			let { prevDisplayedNumber, displayedNumber } = prevState;
			if (prevOperator !== '') {
				const newResult = this.getCalculatedResult(prevState);
				prevDisplayedNumber = newResult;
				displayedNumber = newResult;
			} else {
				prevDisplayedNumber = displayedNumber;
			}

			return {
				operator,
				summary: `${prevState.summary} ${prevState.displayedNumber} ${operator}`,
				displayedNumber,
				prevDisplayedNumber,
				override: true
			};
		});
	}

	setResult() {
		const { operator } = this.state;
		if (operator === '') return;
		this.setState(prevState => ({
			...initialState, displayedNumber: this.getCalculatedResult(prevState)
		}));
	}

	getCalculatedResult(prevState) {
		return eval(`${prevState.prevDisplayedNumber}  ${prevState.operator}  ${prevState.displayedNumber}`).toString();
	}

	setFraction() {
		this.setState(prevState => {
			const { displayedNumber } = prevState;
			if (!displayedNumber.includes(fraction_symbol)) {
				return { displayedNumber: `${displayedNumber}${fraction_symbol}` };
			}
			return { displayedNumber };
		});
	}

	doBackspace() {
		this.setState(prevState => {
			const { displayedNumber } = prevState;
			if (displayedNumber === '0' || displayedNumber.length === 1) {
				return { displayedNumber: '0', override: true };
			}
			return { displayedNumber: displayedNumber.substring(0, displayedNumber.length - 1) };
		});
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
