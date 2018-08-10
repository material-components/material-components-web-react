import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import td from 'testdouble';
import ThumbUnderlay from '../../../packages/switch/ThumbUnderlay';

suite('Switch Thumb Underlay');

test('has mdc-switch__thumb-underlay class', () => {
  const wrapper = mount(<ThumbUnderlay />);
  assert.exists(wrapper.find('.mdc-switch__thumb-underlay'));
});

test('renders native control', () => {
  const wrapper = mount(<ThumbUnderlay />);
  const NativeControl = require('../../../packages/switch/NativeControl');
  assert.equal(wrapper.find('.mdc-switch__thumb').childAt(0).type(), NativeControl.default);
});

test('classNames adds classes', () => {
  const wrapper = mount(<ThumbUnderlay className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('passes nativeControlId to NativeControl through props', () => {
  const wrapper = mount(<ThumbUnderlay nativeControlId={'test-id'} />);
  const nativeControl = wrapper.find('.mdc-switch__thumb').childAt(0);
  assert.equal(nativeControl.props().id, 'test-id');
});

test('passes checked to NativeControl through props', () => {
  const wrapper = mount(<ThumbUnderlay checked />);
  const nativeControl = wrapper.find('.mdc-switch__thumb').childAt(0);
  assert.isTrue(nativeControl.props().checked);
});

test('passes disabled to NativeControl through props', () => {
  const wrapper = mount(<ThumbUnderlay disabled />);
  const nativeControl = wrapper.find('.mdc-switch__thumb').childAt(0);
  assert.isTrue(nativeControl.props().disabled);
});

test('calls props.onChange in NativeControl props.onChange', () => {
  const onChange = td.func();
  const wrapper = mount(<ThumbUnderlay onChange={onChange} />);
  const nativeControl = wrapper.find('.mdc-switch__thumb').childAt(0);
  const mockEvt = {
    target: {
      checked: true,
    },
  };
  nativeControl.props().onChange(mockEvt);
  td.verify(wrapper.props().onChange(mockEvt.target.checked));
});
