import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
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
});
