import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import App from './App';

describe('App test', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	
	it('renders properly', () => {
		const tree = renderer.create(<App />, {
			createNodeMock: element => {
				if (element.type === 'input') {
					return { focus: () => { } };
				}
				return null;
			}
		}).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('manage to type', () => {
		const button = (d) => `CalculatorButton[value="${d}"]`;
		const wrapper = mount(<App />);
		const summary = wrapper.find('.result_label');
		
		
		wrapper.find(button(1)).simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('1');
		expect(summary.text()).toBe('');

		wrapper.find(button('+')).simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('1');
		expect(summary.text()).toBe(' 1 +');

		wrapper.find(button(2)).simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('2');
		expect(summary.text()).toBe(' 1 +');

		wrapper.find(button(3)).simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('23');
		expect(summary.text()).toBe(' 1 +');

		wrapper.find(button('←')).simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('2');
		expect(summary.text()).toBe(' 1 +');

		wrapper.find('.equal').simulate('click');
		expect(wrapper.find('.result_input').props().value).toBe('3');
		expect(summary.text()).toBe('');
	});

	it('use keyboard', () => {
		const wrapper = mount(<App />);
		const summary = wrapper.find('.result_label');
		
		
		wrapper.simulate('keyDown', {key: 1});
		expect(wrapper.find('.result_input').props().value).toBe('1');
		expect(summary.text()).toBe('');

		wrapper.simulate('keyDown', {key: '+'});
		expect(wrapper.find('.result_input').props().value).toBe('1');
		expect(summary.text()).toBe(' 1 +');

		wrapper.simulate('keyDown', {key: 2});
		expect(wrapper.find('.result_input').props().value).toBe('2');
		expect(summary.text()).toBe(' 1 +');

		wrapper.simulate('keyDown', {key: 3});
		expect(wrapper.find('.result_input').props().value).toBe('23');
		expect(summary.text()).toBe(' 1 +');

		wrapper.simulate('keyDown', {key: 'Backspace'});
		expect(wrapper.find('.result_input').props().value).toBe('2');
		expect(summary.text()).toBe(' 1 +');

		wrapper.simulate('keyDown', {key: 'Enter'});
		expect(wrapper.find('.result_input').props().value).toBe('3');
		expect(summary.text()).toBe('');
	});
});
