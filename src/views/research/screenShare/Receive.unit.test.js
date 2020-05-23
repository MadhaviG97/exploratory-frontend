import React from 'react';
import ReactDOM from 'react-dom';
import  Receive  from './Receive';
import {shallow} from 'enzyme'
import Receiver from "../../../components/ScreenShare/Receiver"
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
const match = { params: { projectId: '10012' } }
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'yogya'} }
  });
describe('Receive Screen Sharing', () => {
    it('renders Receiver Component', () => {
      const wrapper = shallow(<Receive match={match}/>);
      expect(wrapper.containsMatchingElement(<Receiver />)).toEqual(true);
    });
    
    });