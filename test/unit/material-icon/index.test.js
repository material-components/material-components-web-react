import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import MaterialIcon, {RippleMaterialIcon} from '../../../packages/material-icon';

suite('MaterialIcon');

test('classNames adds classes', () => {
  const wrapper = mount(<MaterialIcon className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.equal(wrapper.find('.material-icons').length, 1);
});

test('has icon type as child', () => {
  const wrapper = mount(<MaterialIcon icon='menu' />);
  assert.equal(wrapper.find('.material-icons').text(), 'menu');
});

test('if hasRipple true, then it should contain RippleMaterialIcon', () => {
  const wrapper = mount(
    <MaterialIcon icon='menu' hasRipple />
  );
  assert.isTrue(wrapper.contains(<RippleMaterialIcon unbounded icon='menu' />));
});

test('if hasRipple false, then it should not contain RippleMaterialIcon', () => {
  const wrapper = mount(
    <MaterialIcon icon='menu' />
  );
  assert.isFalse(wrapper.contains(<RippleMaterialIcon unbounded icon='menu' />));
});
