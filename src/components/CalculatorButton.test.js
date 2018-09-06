import React from 'react';
import renderer from 'react-test-renderer';
import { shallow  } from 'enzyme';

import { CalculatorButton } from './CalculatorButton';

describe('CalculatorButton test', () =>{
	it('Renders properly', () => {
		const tree = renderer.create(<CalculatorButton className="myclass" value="1" />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('Renders properly', () => {
		const callback = jest.fn();
		const wrapper = shallow(<CalculatorButton onClick={callback} className="myclass" value="1" />);
		wrapper.find('button').simulate('click', 'event');
		expect(callback).toHaveBeenCalledWith('event');
	});
});