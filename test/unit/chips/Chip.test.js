import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {Chip} from '../../../packages/chips';

suite('Chip');

test('classNames adds classes', () => {
  const wrapper = shallow(<Chip className='test-class-name' label={'Hello'} />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-chip'));
});

test('renders chip with correct label', () => {
  const wrapper = shallow(<Chip label={'Hello world'} />);
  assert.isOk(wrapper.find('.mdc-chip'));
  assert.isTrue(wrapper.find('.mdc-chip__text').textContent, 'Hello world');
});

test('default initRipple function', () => {
  Chip.defaultProps.initRipple = td.func();
  mount(<Chip label={'Hello'} />);
  td.verify(Chip.defaultProps.initRipple(td.matchers.isA(Object)), {times: 1});
});
