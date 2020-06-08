import React from 'react';
import ReactDOM from 'react-dom';
import AboutUs from './about-us';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';
import MutationObserver from 'mutation-observer'

beforeAll(() => {
  window.MutationObserver = MutationObserver
  document.getSelection = () => {
    return {
      removeAllRanges: () => {},
      addRange: () => {},
      getRangeAt: () => {},
    }
  }
})

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'janith'} }
  });
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
      }),
  }));
describe('about us', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <AboutUs />
        </Provider>, div);
    });
    /*
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <AboutUs />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    */
    });