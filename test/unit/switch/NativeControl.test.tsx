import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeControl from '../../../packages/switch/NativeControl';

suite('Switch Native Control');

test('has mdc-switch__native-control class', () => {
  const wrapper = shallow(<NativeControl />);
  assert.isTrue(wrapper.hasClass('mdc-switch__native-control'));
});
