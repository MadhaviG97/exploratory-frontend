import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import SignIn from './sign-in';
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
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
describe('Test case for testing login',() =>{
    
    it('check if form displays', () => {
      const { getByTestId } = render(
        <Provider store={store}>
            <SignIn />
        </Provider>);
      const form = getByTestId('form');
      const label = getByTestId('label');
      const emailInput = getByTestId('emailInput');
      const passwordInput = getByTestId('passwordInput');
      const submit = getByTestId('submit');
    
      expect(form).toBeInTheDocument();
      expect(label).toHaveTextContent('Password');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
      expect(submit).toBeInTheDocument();
    });
//this is not a complete test as it does not check values after the login action. this is just a start.
describe('login actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates LOGIN_USER when login has been done', () => {
    fetchMock
      .getOnce('/login', { body: { email: 'my@gmail.com',password:'myname@1234' }, headers: { 'content-type': 'application/json' } })

    const promise= Promise.resolve()
    const expectedActions = [
      { type: types.LOGIN_USER, payload: promise  }
    ]
    const store = mockStore({
        user: { userData: {isAuth:true,first_name:'madhavi'} }
      })
    store.dispatch(actions.loginUser({
        email: 'my@gmail.com',
        password: 'myname@1234',
      }))
      // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
      
  })
})

    /*
    let wrapper;
    test('user name check', () => {
        const {container} = render(<Counter />)
        const button = container.firstChild
        expect(button.textContent).toBe('0')
        fireEvent.click(button)
        expect(button.textContent).toBe('1')
      })
    test('username check',()=>
        {
        wrapper = shallow(
        <Provider store={store}>
            <SignIn />
        </Provider>);
        wrapper.setState({ email: 'my@gmail.com' })
        expect(wrapper.values('email')).toEqual('my@gmail.com');
        })
    it('password check',()=>
        {
        wrapper = shallow(
        <Provider store={store}>
            <SignIn />
        </Provider>);
        wrapper.setValues({ password: 'mypassword' })
        expect(wrapper.values('password')).toEqual('mypassword');
        })
    
    it('login check with right data',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant123'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(true);
    })
    it('login check with wrong data',()=>{
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(false);
    })
    */
})
