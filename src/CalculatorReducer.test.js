import {
	addDigitReducer,
	setOperatorReducer,
	setResultReducer,
	getCalculatedResult,
	setFractionReducer,
	doBackspaceReducer
} from './CalculatorReducer';

describe('CalculatorReducer test', () => {
	it('addDigitReducer replace', () => {
		expect(addDigitReducer({ override: true, displayedNumber: '0' }, '23'))
			.toEqual({ displayedNumber: '23', override: false });
	});

	it('addDigitReducer append', () => {
		expect(addDigitReducer({ override: false, displayedNumber: '2' }, '4'))
			.toEqual({ displayedNumber: '24', override: false });
	});

	it('setOperatorReducer', () => {
		const result = {
			operator: '+',
			summary: ' 123 +',
			displayedNumber: '123',
			prevDisplayedNumber: '123',
			override: true
		};
		expect(setOperatorReducer({ override: false, summary: '', operator: '', prevDisplayedNumber: '12', displayedNumber: '123' }, '+'))
			.toEqual(result);
		expect(setOperatorReducer(result, '-'))
			.toEqual({ displayedNumber: '246', operator: '-', override: true, prevDisplayedNumber: '246', summary: ' 123 + 123 -' });
	});

	it('setResultReducer no opreator', () => {
		const state = { override: false, summary: '', operator: '', prevDisplayedNumber: '12', displayedNumber: '123' };
		expect(setResultReducer(state, ''))
			.toEqual(state);
	});

	it('setResultReducer return new result', () => {
		const state = { override: false, summary: '', operator: '+', prevDisplayedNumber: '12', displayedNumber: '123' };
		expect(setResultReducer(state, '+'))
			.toEqual({ displayedNumber: '135', operator: '', override: true, prevDisplayedNumber: '0', summary: '' });
	});

	it('getCalculatedResult subtraction ', () => {
		const state = { operator: '-', prevDisplayedNumber: '12', displayedNumber: '123' };
		expect(getCalculatedResult(state))
			.toBe('-111');
	});

	it('getCalculatedResult addition', () => {
		const state = { operator: '+', prevDisplayedNumber: '12', displayedNumber: '123' };
		expect(getCalculatedResult(state))
			.toBe('135');
	});

	it('getCalculatedResult multiplication', () => {
		const state = { operator: '*', prevDisplayedNumber: '12', displayedNumber: '123' };
		expect(getCalculatedResult(state))
			.toBe('1476');
	});

	it('getCalculatedResult Divide', () => {
		const state = { operator: '/', prevDisplayedNumber: '10', displayedNumber: '4' };
		expect(getCalculatedResult(state))
			.toBe('2.5');
	});

	it('getCalculatedResult Divide by zero', () => {
		const state = { operator: '/', prevDisplayedNumber: '10', displayedNumber: '0' };
		expect(getCalculatedResult(state))
			.toBe('Infinity');
	});

	it('setFractionReducer add fraction', () => {
		const state = { displayedNumber: '10' };
		expect(setFractionReducer(state))
			.toEqual({ displayedNumber: '10.' });
	});

	it('setFractionReducer fraction exist', () => {
		const state = { displayedNumber: '10.' };
		expect(setFractionReducer(state))
			.toEqual({ displayedNumber: '10.' });
	});

	it('doBackspaceReducer remove', () => {
		const state = { displayedNumber : '10'};
		expect(doBackspaceReducer(state))
			.toEqual({ displayedNumber: '1' });
	});

	it('doBackspaceReducer set zero', () => {
		const state = { displayedNumber : '1'};
		expect(doBackspaceReducer(state))
			.toEqual({ displayedNumber: '0', override: true });
	});

	it('doBackspaceReducer set zero', () => {
		const state = { displayedNumber : '0'};
		expect(doBackspaceReducer(state))
			.toEqual({ displayedNumber: '0', override: true });
	});
});