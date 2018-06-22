import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import ChipSet from '../../../packages/chips';

suite('ChipSet');

test('classNames adds classes', () => {
  const wrapper = shallow(<ChipSet className='test-class-name' chipLabels={['Chip1']} />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-chip-set'));
});

test('renders chips', () => {
  const wrapper = shallow(<ChipSet chipLabels={['Chip1']} />);
  assert.isOk(wrapper.find('.mdc-chip'));
  assert.equal(wrapper.find('.mdc-chip__text').textContent, 'Chip1');
});
