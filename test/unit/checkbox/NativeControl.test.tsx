import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeControl from '../../../packages/checkbox/NativeControl';

suite('Checkbox Native Control');

test('has mdc-checkbox__native-control class', () => {
  const wrapper = shallow(<NativeControl />);
  assert.isTrue(wrapper.hasClass('mdc-checkbox__native-control'));
});
