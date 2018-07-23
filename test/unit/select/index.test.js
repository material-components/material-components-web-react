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

test('child component gets foundation', () => {
  const child = (<div></div>);
  const wrapper = mount(<Select label='my label'>{child}</Select>);
  debugger
  assert.isTrue()
});
