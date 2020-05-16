import React from 'react';
import  CreatePage  from './CreatePage';
import { mount } from 'enzyme';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
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

const mLocalStorage = {
  _storage: {},
  getItem: jest.fn((key) => {
    return mLocalStorage._storage[key];
  }),
  setItem: jest.fn((key, value) => {
    mLocalStorage._storage[key] = value;
  }),
};
Object.defineProperty(window, 'localStorage', {
  value: mLocalStorage,
});
const store = mockStore({
    user: { userDate: {isAuth:true,first_name:'yogya'} }
  });

  it('should not call onChange prop with a value', () => {
    const onChangeMock = jest.fn();
    const component = mount(
        <Provider store={store}>
            <CreatePage onEditorChange={onChangeMock} value="custom value" />
        </Provider>
            );
    component.find('QuillEditor').simulate('change');
    expect(onChangeMock).not.toBeCalledWith('custom value');
  });
