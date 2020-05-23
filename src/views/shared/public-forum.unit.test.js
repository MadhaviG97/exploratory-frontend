import React from 'react';
import ReactDOM from 'react-dom';
import PublicForum from './public-forum';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'janith'},questions:{bla:"bla"},forum:{bla:"bla"} }//still does not work
  });
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
      }),
  }));
describe('public forum', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <PublicForum />
        </Provider>, div);
    });
    /*
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <PublicForum />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      */
});