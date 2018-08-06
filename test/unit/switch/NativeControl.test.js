import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import td from 'testdouble';
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

test('calls props.handleDisabled if props.disabled updates', () => {
  const handleDisabled = td.func();
  const wrapper = shallow(<NativeControl handleDisabled={handleDisabled} />);
  wrapper.setProps({disabled: true});
  td.verify(handleDisabled(true), {times: 1});
});

test('calls props.handleChange if props.checked updates', () => {
  const handleChange = td.func();
  const wrapper = shallow(<NativeControl handleChange={handleChange} />);
  wrapper.setProps({checked: true});
  td.verify(handleChange(true), {times: 1});
});

test('calls props.setrippleActivatorEl on mount', () => {
  const setrippleActivatorEl = td.func();
  mount(<NativeControl setrippleActivatorEl={setrippleActivatorEl} />);
  td.verify(setrippleActivatorEl(td.matchers.isA(Object)), {times: 1});
});
