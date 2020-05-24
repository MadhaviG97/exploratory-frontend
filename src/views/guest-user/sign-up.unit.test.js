import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './sign-up';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import * as actions from '../../_actions/user_actions'
import * as types from '../../_actions/types'
import fetchMock from 'fetch-mock'
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:false} }
  });
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
      }),
  }));
describe('signup', () => {
    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <SignUp />
        </Provider>, div);
    });
    it('renders correctly', () => {
      const tree = renderer
        .create(
        <Provider store={store}>
          <SignUp />
        </Provider>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('creates REGISTER_USER when signup has been done', () => {
      fetchMock
        .getOnce('/register', { body: { email: 'my@gmail.com',password:'myname@1234',first_name:"my",last_name:"name",contact_no:"0978765768",confirm_password:"myname@1234" }, headers: { 'content-type': 'application/json' } })
  
      
      const expectedActions = [
        { type: types.REGISTER_USER, payload:  {
              "confirm_password": "myname@1234",
              "contact_no": "0978765768",
              "email": "my@gmail.com",
              "first_name": "my",
              "last_name": "name",
              "password": "myname@1234",
              }  }
      ]
      
      const store = mockStore({
          user: { userData: {isAuth:false} }
        })
      store.dispatch(actions.registerUser({ email: 'my@gmail.com',password:'myname@1234',first_name:"my",last_name:"name",contact_no:"0978765768",confirm_password:"myname@1234" }))
        // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
        
    })
});
