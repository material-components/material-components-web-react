import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {MDCButton} from '../../../packages/button';

suite('Button');

test('classNames adds classes', () => {
  const wrapper = shallow(<MDCButton className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-button'));
});

test('renders an icon', () => {
  const icon = <i className='test-icon' />;
  const wrapper = shallow(<MDCButton icon={icon} />);
  assert.isTrue(wrapper.find('.test-icon').hasClass('mdc-button__icon'));
});

test('renders a raised button', () => {
  const wrapper = shallow(<MDCButton raised />);
  assert.isTrue(wrapper.hasClass('mdc-button--raised'));
});

test('renders a unelevated button', () => {
  const wrapper = shallow(<MDCButton unelevated />);
  assert.isTrue(wrapper.hasClass('mdc-button--unelevated'));
});

test('renders a stroked button', () => {
  const wrapper = shallow(<MDCButton stroked />);
  assert.isTrue(wrapper.hasClass('mdc-button--stroked'));
});

test('renders a dense button', () => {
  const wrapper = shallow(<MDCButton dense />);
  assert.isTrue(wrapper.hasClass('mdc-button--dense'));
});
