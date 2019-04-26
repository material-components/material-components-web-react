import * as React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import {MenuListItem} from '../../../packages/menu/index';

suite('MenuListItem');

test('classNames adds classes', () => {
  const wrapper = mount(<MenuListItem className='test-class-name' />);
  assert.isTrue(wrapper.getDOMNode().classList.contains('mdc-list-item'));
  assert.isTrue(wrapper.getDOMNode().classList.contains('test-class-name'));
});

test('role is defaulted to menuitem', () => {
  const wrapper = mount(<MenuListItem />);
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'menuitem');
});

test('role is set to props.role', () => {
  const wrapper = mount(<MenuListItem role='menu' />);
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'menu');
});
