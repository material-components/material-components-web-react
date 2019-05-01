import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListGroupSubheader} from '../../../packages/list/index';

suite('ListGroupSubheader');

test('className adds classes', () => {
  const wrapper = shallow(<ListGroupSubheader className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-group__subheader class', () => {
  const wrapper = shallow(<ListGroupSubheader />);
  assert.isTrue(wrapper.hasClass('mdc-list-group__subheader'));
});

test('renders children', () => {
  const wrapper = shallow(
    <ListGroupSubheader>
      <div className='child-list' />
    </ListGroupSubheader>
  );
  assert.exists(wrapper.find('.child-list'));
});

test('renders with given tag', () => {
  const wrapper = shallow(<ListGroupSubheader tag='span' />);
  assert.exists(wrapper.find('span'));
});
