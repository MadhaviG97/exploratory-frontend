import React from 'react';
import ReactDOM from 'react-dom';
import  FileManager  from './FileManager';
import { mount} from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

const handleClick =  jest.fn();
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

const props = {
    match: { params: { folder: '123' ,group:'10012'} },
  }

describe('FileManager', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  it('mocks API call', async () => {
    const token = 'JWT1111';
    mLocalStorage.setItem('token', token);
    const response = { data:{files: [ {filename: 'mocked name',metadata:'pol'}],folders: [ {name: 'mocked name',_id:'p12'} ],success:true }};
    jest.spyOn(axios, 'post').mockResolvedValueOnce(response);
    const wrapper = mount(
              <Provider store={store}>
                  <FileManager {...props} />
              </Provider>
              )
        
      
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    //expect(wrapper.find('.org-docs-header').text()).toContain('mocked name');
    expect(axios.post).toHaveBeenCalledTimes(3);
    //expect(wrapper.find("folders").length).toEqual(0)

  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Provider store={store}>
        <FileManager {...props} />
    </Provider>, div);
});
    it('renders correctly', () => {
        const tree = renderer
        .create(
        <Provider store={store}>
            <FileManager {...props} />
        </Provider>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });

});

 

/*
jest.mock('axios')
axios.post.mockImplementation((url) => {
    switch (url) {
      case '/drive/getfolders':
        return Promise.resolve({ data:{folders: [ {name: 'mocked name',_id:'p12'} ],success:true }})
      case '/drive/getfolders':
        return Promise.resolve({ data:{files: [ {filename: 'mocked name',metadata:'pol'}] }})
      default:
        return Promise.reject(new Error('not found'))
    }
  })
  
  test('should fetch users', () => {
    return axios.post('/drive/getfolders').then(folders => expect(folders).toEqual({ data:{folders: [ {name: 'mocked name',_id:'p12'} ],success:true }}))
  })
  
  test('should fetch items', () => {
    return axios.post('/drive/getfiles').then(files => expect(items).toEqual({ data:{files: [ {filename: 'mocked name',metadata:'pol'}] }}))
  })
  */
