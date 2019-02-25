import * as React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';

import MaterialIcon, {
  RippleMaterialIcon,
} from '../../../packages/material-icon/index';

suite('MaterialIcon');

test('renders a MaterialIcon with default tag', () => {
  const wrapper = mount<MaterialIcon>(<MaterialIcon>test</MaterialIcon>);
  assert.strictEqual(wrapper.find('.material-icons').type(), 'i');
});

test('renders a MaterialIcon with custom tag', () => {
  const wrapper = mount(<MaterialIcon tag='button' />);
  assert.strictEqual(wrapper.find('.material-icons').type(), 'button');
});

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
  <RippleMaterialIcon hasRipple unbounded icon='menu' tag='i' />
);

const rippledTaggedIconComponent = (
  <RippleMaterialIcon hasRipple unbounded icon='menu' tag='a' />
);

test('if hasRipple true, then it should contain RippleMaterialIcon', () => {
  const wrapper = mount(<MaterialIcon icon='menu' hasRipple />);
  assert.isTrue(wrapper.contains(rippledIconComponent));
});

test('if hasRipple true prop.tag, then it should contain RippleMaterialIcon with custom tag', () => {
  const wrapper = mount(<MaterialIcon icon='menu' tag='a' hasRipple />);
  assert.isTrue(wrapper.contains(rippledTaggedIconComponent));
  assert.strictEqual(wrapper.find('.material-icons').type(), 'a');
});

test('if hasRipple false, then it should not contain RippleMaterialIcon', () => {
  const wrapper = mount(<MaterialIcon icon='menu' />);
  assert.isFalse(wrapper.contains(rippledIconComponent));
});
