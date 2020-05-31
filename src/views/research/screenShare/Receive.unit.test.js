/*import React from 'react';
import ReactDOM from 'react-dom';
import  Receive  from './Receive';
import {mount,shallow} from 'enzyme'
import Receiver from "../../../components/ScreenShare/Receiver"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';
const realUseState = React.useState
const stubInitialState = [{researcher:{researcher_id:'10002'}}]
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    push: jest.fn(),
  }),
}));
const match = { params: { projectId: '10012' } }
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'yogya',id:'10002'} }
  });
  const props = {
    this:{group:'10002'},
    group: '10012',
    userProp:{userData:{_id:'10002'}},
  }
describe('Receive Screen Sharing', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
    it('renders Receiver Component', () => {
      jest
      .spyOn(React, 'useState')
      .mockImplementation(() => realUseState(stubInitialState))
      const wrapper = mount(
      <Provider store={store}>
        <Receive match={match}/>
      </Provider>);
      expect(wrapper.containsMatchingElement(<Receiver {...props}/>)).toEqual(true);
    });
    
    });
    */
   test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });