import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme'
import CompareDialog from "./CompareDialog"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
      push: jest.fn(),
    }),
  }));
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'yogya'} }
});
describe('Sender of Screen Sharing', () => {
    
    it('able to find display element', () => {
        const wrapper = shallow(<CompareDialog />);
        expect(wrapper.find('#display').html().length).toBe(24)
        });
    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Provider store={store}>
        <CompareDialog />
    </Provider>, div);
});
/*
    it('renders correctly', () => {
        const tree = renderer
        .create(
        <Provider store={store}>
            <Receive />
        </Provider>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
    */
    });