import React from 'react';
import ReactDOM from 'react-dom';
import PublicForum from './public-forum';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer';

//mock (useselector=>state) values 
const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user: { userData: {isAuth:true,first_name:'janith'} },//still does not work
    questions:{bla:"bla"},
    forum:{bla:"bla"}
  });
//mock usehistory and uselocation functions (just because it creates an error :p) can mock any other use... function in the sameway. BTW useselector may need actual values; so passing them with store={} will do
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
    }),
    useLocation: () => ({
      push: jest.fn(),
    }),
  }));
// if there are any variables to pass with the component, can pass them as <PublicForum ...props >
// if there are any import errors direct those errors into tests/mock (see moduleNameMapper in jest.config.js)
//to only test dispatch events this may not be needed.react-redux testing will do. In sign-up and sign-in test files, testing dispatch events by mocking can be found. But dont know whether thay are correct.
// In sign-in there are few tests to see whether the input,submit button is present and soon
// to check if a component imported from Components folders are present can use 'wrapper.find().exists()).toBeTruthy()' see 'CompareDoc.unit.test.js'
//Provider along with redux store values is passed because otherwise it will create the error 'not wrapped in provider'

/*could not create snapshots for any of the files 
  about-us,user-profile and public-forum 
  because they create different errors.
  there was a styling error, event listener error in a node module...
*/
describe('public forum', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <Provider store={store}>
            <PublicForum />
        </Provider>, div);
    });
    /*
    it('renders correctly', () => {
        const tree = renderer
          .create(
          <Provider store={store}>
            <PublicForum />
          </Provider>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      */
});