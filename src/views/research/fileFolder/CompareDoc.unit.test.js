import React from 'react';
import  CompareDoc  from './CompareDoc';
import {shallow} from 'enzyme'
import CompareDialog from "../../../components/drive/CompareDialog"

describe('Compare Doc', () => {
    it('renders Compare Doc Dialog', () => {
      const wrapper = shallow(<CompareDoc />);
      expect(wrapper.containsMatchingElement(<CompareDialog />)).toEqual(true);
    });
  });