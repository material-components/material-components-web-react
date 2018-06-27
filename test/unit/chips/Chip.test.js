import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import {Chip} from '../../../packages/chips';

suite('Chip');

test('classNames adds classes', () => {
  const wrapper = mount(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders chip', () => {
  const wrapper = mount(<Chip>Hello world</Chip>);
  assert.exists(wrapper.find('.mdc-chip'));
});
