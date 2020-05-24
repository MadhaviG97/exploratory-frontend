import React from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';
import {shallow,mount} from 'enzyme'
import QuillEditor from "./QuillEditor"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';
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
    user: { userData: {isAuth:true,first_name:'yogya'} }
  });
describe('Quill Editor', () => {
    it('renders React Quill Component', () => {
      const wrapper = mount(<Provider store={store}><QuillEditor /></Provider>);
      expect(wrapper.find(ReactQuill).exists()).toBeTruthy();
    });
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Provider store={store}>
          <QuillEditor />
      </Provider>, div);
  });
});