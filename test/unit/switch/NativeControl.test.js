import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeControl from '../../../packages/switch/NativeControl';

suite('Switch Native Control');

test('has mdc-switch__native-control class', () => {
  const wrapper = shallow(<NativeControl/>);
  assert.isTrue(wrapper.hasClass('mdc-switch__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<NativeControl className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});
