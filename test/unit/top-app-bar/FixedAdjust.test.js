import React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import td from 'testdouble';
import {TopAppBarFixedAdjust} from '../../../packages/top-app-bar/index';
import withRipple from '../../../packages/ripple/index';

suite('TopAppBarFixedAdjust');

test('classNames adds classes', () => {
  const wrapper = shallow(<TopAppBarFixedAdjust className='test-class-name'>
    hello
  </TopAppBarFixedAdjust>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-top-app-bar--fixed-adjust'));
});

test('renders children', () => {
  const wrapper = shallow(<TopAppBarFixedAdjust>
    <span className='child-element'>HI</span>
  </TopAppBarFixedAdjust>);
  assert.equal(wrapper.find('.child-element').length, 1);
});

test('renders as a different tag name when passed props.tag', () => {
  const wrapper = shallow(<TopAppBarFixedAdjust tag='div'>hello</TopAppBarFixedAdjust>);
  assert.equal(wrapper.find('main').length, 0);
  assert.equal(wrapper.type(), 'div');
});
