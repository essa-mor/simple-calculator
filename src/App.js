import React, { Component } from 'react';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<input type="text" value="0" className="result_input" readOnly/>
				<button type="button" className="clear_result">Clear</button>
				<button type="button" className="operator">-</button>
				<button type="button" className="digit">7</button>
				<button type="button" className="digit">8</button>
				<button type="button" className="digit">9</button>
				<button type="button" className="operator">/</button>
				<button type="button" className="digit">4</button>
				<button type="button" className="digit">5</button>
				<button type="button" className="digit">6</button>
				<button type="button" className="operator">*</button>
				<button type="button" className="digit">1</button>
				<button type="button" className="digit">2</button>
				<button type="button" className="digit">3</button>
				<button type="button" className="operator">+</button>
				<button type="button" className="digit">0</button>
				<button type="button" className="digit">.</button>
				<button type="button" className="equal">=</button>
			</div>
		);
	}
}

export default App;
