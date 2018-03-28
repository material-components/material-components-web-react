import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import TopAppBar from '../../../packages/top-app-bar';

suite('TopAppBar');

test('has correct standard class', () => {
  const wrapper = shallow(<TopAppBar />);
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar'));
});
