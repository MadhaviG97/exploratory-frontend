import React from 'react';
import ReactDOM from 'react-dom';
import  EditorBlog  from './EditorBlog';
import { mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

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
    user: { userData: {isAuth:true,first_name:'yogya'} }
  });
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    push: jest.fn(),
  }),
}));

describe('editor blog', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  it('mocks API call', async () => {
    const token = 'JWT1111';
    mLocalStorage.setItem('token', token);
    const response = { data:{blogs: [ {name: 'mocked name',content:'<p>pol</p>'} ],success:true }};
    jest.spyOn(axios, 'post').mockResolvedValueOnce(response);
    const wrapper = mount(
        <Provider store={store}>
            <EditorBlog />
        </Provider>
        );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    //expect(wrapper.find('.org-docs-header').text()).toContain('mocked name');
    expect(axios.post).toBeCalledWith('/editor/getBlogs'/*, {
      headers: { Authorization: 'JWT ' + token },
    }*/);
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Provider store={store}>
        <EditorBlog />
    </Provider>, div);
  });
  it('renders correctly', () => {
      const tree = renderer
        .create(
        <Provider store={store}>
          <EditorBlog />
        </Provider>)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
});
