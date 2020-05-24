import React from 'react';
import ReactDOM from 'react-dom';
import  CompareDoc  from './CompareDoc';
import {shallow} from 'enzyme'
import CompareDialog from "../../../components/drive/CompareDialog"
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
    user: { userData: {isAuth:true,first_name:'madhavi'} }
  });
const match = { params: { projectId: '10012' } }
describe('Compare Doc', () => {
    it('renders Compare Doc Dialog', () => {
      const wrapper = shallow(<CompareDoc match={match}/>);
      expect(wrapper.find(CompareDialog).exists()).toBeTruthy();
    });
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={store}>
          <CompareDialog match={match}/>
      </Provider>, div);
  });
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <CompareDialog match={match}/>
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });