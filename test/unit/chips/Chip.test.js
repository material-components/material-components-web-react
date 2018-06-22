import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount} from 'enzyme';
import {Chip} from '../../../packages/chips';

suite('Chip');

test('classNames adds classes', () => {
  const wrapper = mount(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-chip'));
});

test('renders chip', () => {
  const wrapper = mount(<Chip>Hello world</Chip>);
  assert.isOk(wrapper.find('.mdc-chip'));
});

test('default initRipple function', () => {
  Chip.defaultProps.initRipple = td.func();
  mount(<Chip />);
  td.verify(Chip.defaultProps.initRipple(td.matchers.isA(Object)), {times: 1});
});
