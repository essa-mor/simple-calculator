import React from 'react';
import renderer from 'react-test-renderer';

import ResultPanel from './ResultPanel';

const focusMock = {
	createNodeMock: element => {
		if (element.type === 'input') {
			// mock a focus functiona
			return {
				focus: () => {}
			};
		}
		return null;
	}
};

describe('ResultPanel test', () =>{
	it('Renders properly', () => {
		const tree = renderer.create(<ResultPanel summary="1 +" result="1" className="mycalss" />, focusMock).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('Renders properly - can\'t devide by zero', () => {
		const tree = renderer.create(<ResultPanel summary="1 +" result="Infinity" className="mycalss" />, focusMock).toJSON();
		expect(tree).toMatchSnapshot();
	});
});