import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListItemMeta} from '../../../packages/list/index';

suite('ListItemMeta');

test('className adds classes if meta is a string', () => {
  const wrapper = shallow(
    <ListItemMeta meta='info' className='test-class-name' />
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('className adds classes if meta is an element', () => {
  const wrapper = shallow(
    <ListItemMeta meta={<button />} className='test-class-name' />
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-item__meta class if meta is a string', () => {
  const wrapper = shallow(<ListItemMeta meta='info' />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__meta'));
});

test('has mdc-list-item__meta class if meta is an element', () => {
  const wrapper = shallow(<ListItemMeta meta={<button />} />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__meta'));
});

test('renders span element if meta is a string', () => {
  const wrapper = shallow(<ListItemMeta meta='info' />);
  assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'span');
});

test('renders element if meta is an element', () => {
  const wrapper = shallow(<ListItemMeta meta={<button />} />);
  assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'button');
});

test('has tabIndex of props.tabIndex if specified and tabbableOnListItemFocus is true', () => {
  const wrapper = shallow(
    <ListItemMeta meta={<button />} tabIndex={3} tabbableOnListItemFocus />
  );
  assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, 3);
});

test('has tabIndex of -1 if tabbableOnListItemFocus is false', () => {
  const wrapper = shallow(
    <ListItemMeta meta={<button />} childrenTabIndex={3} />
  );
  assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, -1);
});
