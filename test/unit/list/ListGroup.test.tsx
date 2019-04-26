import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListGroup} from '../../../packages/list/index';

suite('ListGroup');

test('className adds classes', () => {
  const wrapper = shallow(<ListGroup className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-group class', () => {
  const wrapper = shallow(<ListGroup />);
  assert.isTrue(wrapper.hasClass('mdc-list-group'));
});

test('renders children', () => {
  const wrapper = shallow(
    <ListGroup>
      <div className='child-list' />
    </ListGroup>
  );
  assert.exists(wrapper.find('.child-list'));
});

test('renders with given tag', () => {
  const wrapper = shallow(<ListGroup tag='span' />);
  assert.exists(wrapper.find('span'));
});
