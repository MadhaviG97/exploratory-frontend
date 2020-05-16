import React from 'react';
import ReactDOM from 'react-dom';
import ResearchPublic from './ViewResearchPublic';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'madhavi'} }
  });
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
      }),
  }));
describe('view research public', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <ResearchPublic />
        </Provider>, div);
    });
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <ResearchPublic />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});