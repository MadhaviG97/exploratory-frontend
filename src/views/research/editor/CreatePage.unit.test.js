import React from 'react';
import  CreatePage  from './CreatePage';
import { mount ,shallow} from 'enzyme';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import MutationObserver from 'mutation-observer'
import renderer from 'react-test-renderer';
const realUseState = React.useState
const stubInitialState = [{researcher:{researcher_id:'10002'}}]
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
const match = { params: { projectId: '10012' } }
Object.defineProperty(window, 'localStorage', {
  value: mLocalStorage,
});
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    push: jest.fn(),
  }),
}));


const store = mockStore({
    user: { userData: {isAuth:true,first_name:'yogya',id:'10002'} }
  });

  it('should not call onChange prop with a value', () => {
    jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(stubInitialState))
    .mockImplementationOnce(() => realUseState(true))
    const onChangeMock = jest.fn();
    const component = mount(
        <Provider store={store}>
            <CreatePage onEditorChange={onChangeMock} value="custom value" match={match}/>
        </Provider>
            );
    component.find('QuillEditor').simulate('change');
    expect(onChangeMock).not.toBeCalledWith('custom value');
  });
  describe('create research', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <CreatePage match={match}/>
        </Provider>, div);
    });
    /*
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <CreatePage />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      */
});