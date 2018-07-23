import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import Select from '../../../packages/select/index';

suite('Select');

test('has mdc-select class', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.hasClass('mdc-select'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Select
    label='my label'
    className='test-class-name'
  />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('creates foundation', () => {
  const wrapper = mount(<Select label='my label' />);
  assert.exists(wrapper.instance().foundation_);
});

test('#foundation_setValue gets called when state.value updates', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().foundation_.setValue = td.func();
  const value = 'value';
  wrapper.setState({value});
  td.verify(wrapper.instance().foundation_.setValue(value), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Select label='my label' />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('props.outlined will add')
