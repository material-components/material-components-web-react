import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import ThumbUnderlay from '../../../packages/switch/ThumbUnderlay';

suite('Switch Thumb Underlay');

test('has mdc-switch__thumb-underlay class', () => {
  const wrapper = mount(<ThumbUnderlay rippleActivator={<div/>}/>);
  assert.exists(wrapper.find('.mdc-switch__thumb-underlay'));
});

test('classNames adds classes', () => {
  const wrapper = mount(<ThumbUnderlay className='test-class-name' rippleActivator={<div/>}/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});
