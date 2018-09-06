export const initialState = { prevDisplayedNumber: '0', override: true, displayedNumber: '0', operator: '', summary: '' };
export const fraction_symbol = '.';

export function addDigitReducer(prevState, value) {
	const prevDisplayedNumber = prevState.override ? '' : prevState.displayedNumber;
	return { displayedNumber: `${prevDisplayedNumber}${value}`, override: false };
}

export function setOperatorReducer(prevState, operator) {
	const prevOperator = prevState.operator;
	let { prevDisplayedNumber, displayedNumber } = prevState;
	if (prevOperator !== '') {
		const newResult = getCalculatedResult(prevState);
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
}

export function setResultReducer(prevState, operator) {
	if (operator === '') return prevState;
	return {
		...initialState, displayedNumber: getCalculatedResult(prevState)
	};
}

export function getCalculatedResult(prevState) {
	let result = 0;
	const { prevDisplayedNumber, operator, displayedNumber } = prevState;
	switch (operator) {
		case '-':
			result = Number(prevDisplayedNumber) - Number(displayedNumber);
			break;
		case '+':
			result = Number(prevDisplayedNumber) + Number(displayedNumber);
			break;
		case '/':
			result = Number(prevDisplayedNumber) / Number(displayedNumber);
			break;
		case '*':
			result = Number(prevDisplayedNumber) * Number(displayedNumber);
			break;
		default:
			break;
	}
	return result.toString();
}

export function setFractionReducer(prevState) {
	const { displayedNumber } = prevState;
	if (!displayedNumber.includes(fraction_symbol)) {
		return { displayedNumber: `${displayedNumber}${fraction_symbol}` };
	}
	return { displayedNumber };
}

export function doBackspaceReducer(prevState) {
	const { displayedNumber } = prevState;
	if (displayedNumber === '0' || displayedNumber.length === 1) {
		return { displayedNumber: '0', override: true };
	}
	return { displayedNumber: displayedNumber.substring(0, displayedNumber.length - 1) };
}

