import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import ChipSet from '../../../packages/chips';

suite('ChipSet');

test('classNames adds classes', () => {
  const wrapper = shallow(<ChipSet className='test-class-name' labels={[]} />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-chip-set'));
});

test('renders chip set and chip', () => {
  const wrapper = shallow(<ChipSet labels={['Hello']} />);
  assert.isOk(wrapper.find('.mdc-chip-set'));
  assert.isOk(wrapper.find('.mdc-chip'));
});
