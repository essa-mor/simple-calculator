import { addDigitReducer } from './CalculatorReducer';

describe('CalculatorReducer test', () => {
	it('addDigitReducer replace', () => {
		expect(addDigitReducer({ override: true, displayedNumber: '0' }, '23'))
			.toEqual({ displayedNumber: '23', override: false });
	});
});