import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';

import MaterialIcon, {
  RippleMaterialIcon,
} from '../../../packages/material-icon/index';

suite('MaterialIcon');

test('classNames adds classes', () => {
  const wrapper = mount(<MaterialIcon className='test-class-name' />);
  const icon = wrapper.find('.material-icons');
  assert.isTrue(icon.hasClass('test-class-name'));
  assert.equal(icon.length, 1);
});

test('classNames adds ripple class if hasRipple is true', () => {
  const wrapper = mount(<MaterialIcon hasRipple className='test-class-name' />);
  const icon = wrapper.find('.material-icons');
  assert.isTrue(icon.hasClass('test-class-name'));
  assert.isTrue(icon.hasClass('material-icons--ripple-surface'));
});

test('has icon type as child', () => {
  const wrapper = mount(<MaterialIcon icon='menu' />);
  assert.equal(wrapper.find('.material-icons').text(), 'menu');
});
const rippledIconComponent = (
  <RippleMaterialIcon hasRipple unbounded icon='menu' />
);

test('if hasRipple true, then it should contain RippleMaterialIcon', () => {
  const wrapper = mount(<MaterialIcon icon='menu' hasRipple />);
  assert.isTrue(wrapper.contains(rippledIconComponent));
});

test('if hasRipple false, then it should not contain RippleMaterialIcon', () => {
  const wrapper = mount(<MaterialIcon icon='menu' />);
  assert.isFalse(wrapper.contains(rippledIconComponent));
});
