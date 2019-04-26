import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListItemText} from '../../../packages/list/index';

suite('ListItemText');

test('className adds classes', () => {
  const wrapper = shallow(<ListItemText className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders primary text if text is string', () => {
  const wrapper = shallow(<ListItemText primaryText='Hello' />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__text'));
});

test('renders primary text if text is element', () => {
  const wrapper = shallow(<ListItemText primaryText={<span>Hello</span>} />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__text'));
});

test('renders primary and secondary text if secondary text provided', () => {
  const wrapper = shallow(
    <ListItemText primaryText='Hello' secondaryText='World' />
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item__text'));
  assert.exists(wrapper.find('.mdc-list-item__primary-text'));
  assert.exists(wrapper.find('.mdc-list-item__secondary-text'));
});

test('renders primary and secondary text if text are elements', () => {
  const wrapper = shallow(
    <ListItemText
      primaryText={<span>Hello</span>}
      secondaryText={<span>World</span>}
    />
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item__text'));
  assert.exists(wrapper.find('.mdc-list-item__primary-text'));
  assert.exists(wrapper.find('.mdc-list-item__secondary-text'));
});
