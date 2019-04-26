import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import TabRipple from '../../../packages/tab/TabRipple';

suite('Tab Ripple');

test('has mdc-tab__ripple class', () => {
  const wrapper = mount(<TabRipple />);
  assert.exists(wrapper.find('.mdc-tab__ripple'));
});

test('classNames adds classes', () => {
  const wrapper = mount(<TabRipple className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});
