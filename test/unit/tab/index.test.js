import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabIndicator from '../../../packages/tab-indicator/index';

suite('Tab');

test('classNames adds classes', () => {
  const wrapper = shallow(<TabIndicator className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator'));
});

test('adds the fade class if props.fade is true', () => {
  const wrapper = shallow(<TabIndicator fade />);
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator--fade'));
});

test('adds the fade class if props.active is true', () => {
  const wrapper = shallow(<TabIndicator active />);
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator--active'));
});
