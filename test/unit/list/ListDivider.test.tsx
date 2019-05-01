import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListDivider} from '../../../packages/list/index';

suite('ListDivider');

test('className adds classes', () => {
  const wrapper = shallow(<ListDivider className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-divider class', () => {
  const wrapper = shallow(<ListDivider />);
  assert.isTrue(wrapper.hasClass('mdc-list-divider'));
});

test('has separator role by default', () => {
  const wrapper = shallow(<ListDivider />);
  assert.equal(wrapper.props().role, 'separator');
});

test('renders with given tag', () => {
  const wrapper = shallow(<ListDivider tag='span' />);
  assert.exists(wrapper.find('span'));
});
