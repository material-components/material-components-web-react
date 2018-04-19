import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {Button} from '../../../packages/button';

suite('Button');

test('classNames adds classes', () => {
  const wrapper = shallow(<Button className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-button'));
});

test('does not render icon if props.icon is null', () => {
  const wrapper = shallow(<Button />);
  assert.equal(wrapper.find('.mdc-button__icon').length, 0);
});

test('renders an icon', () => {
  const icon = <i className='test-icon' />;
  const wrapper = shallow(<Button icon={icon} />);
  assert.isTrue(wrapper.find('.test-icon').hasClass('mdc-button__icon'));
});

test('renders a raised button', () => {
  const wrapper = shallow(<Button raised />);
  assert.isTrue(wrapper.hasClass('mdc-button--raised'));
});

test('renders a unelevated button', () => {
  const wrapper = shallow(<Button unelevated />);
  assert.isTrue(wrapper.hasClass('mdc-button--unelevated'));
});

test('renders a stroked button', () => {
  const wrapper = shallow(<Button stroked />);
  assert.isTrue(wrapper.hasClass('mdc-button--stroked'));
});

test('default initRipple function', () => {
  Button.defaultProps.initRipple = td.func();
  mount(<Button />);
  td.verify(Button.defaultProps.initRipple(td.matchers.isA(Object)), {times: 1});
});
