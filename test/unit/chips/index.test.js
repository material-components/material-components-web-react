import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import ChipSet, {Chip} from '../../../packages/chips';

suite('ChipSet');

test('className prop adds classes', () => {
  const wrapper = shallow(<ChipSet className='test-class-name' labels={[]} />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-chip-set'));
});

test('renders chip set and chip', () => {
  const wrapper = shallow(<ChipSet labels={['Hello', 'World']} />);
  assert.exists(wrapper.find('.mdc-chip-set'));
  assert.lengthOf(wrapper.find(Chip), 2);
});

test('#adapter.hasClass returns true if class was added in className prop', () => {
  const wrapper = shallow(<ChipSet className='test-class-name' labels={[]} />);
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
  assert.isTrue(wrapper.instance().adapter.hasClass('mdc-chip-set'));
});
