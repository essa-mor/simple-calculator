import React, { Component } from 'react';
import WithDisableFocus from './WithDisableFocus';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

class MockComponent extends Component {
	render() {
		const { onFocus } = this.props;
		return (<div onFocus={onFocus}>Fake Component</div>);
	}
}

let WithDisableFocusComponent = WithDisableFocus(MockComponent);

describe('WithDisableFocus test', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(<WithDisableFocusComponent />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('blur on focus', () => {
		const callback = jest.fn();
		const wrapper = mount(<WithDisableFocusComponent />);
		const target = wrapper.find('div');
		target.simulate('focus', { target: { blur: callback } });
		expect(callback).toHaveBeenCalledTimes(1);
	});
});