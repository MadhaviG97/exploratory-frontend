import React from 'react';
import ReactDOM from 'react-dom';
import ResearchPrivate from './ViewResearchPrivate';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'madhavi'} }
  });
const match = { params: { projectId: '10012' } }
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
      }),
    useParams: () => ({
      push: jest.fn(),
    }),
  }));
describe('view research private', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <ResearchPrivate match={match}/>
        </Provider>, div);
    });
    /*
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <ResearchPrivate />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      */
});