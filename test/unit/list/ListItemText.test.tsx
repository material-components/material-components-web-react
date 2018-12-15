import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
// @ts-ignore
import {ListItemText} from '../../../packages/list/index.tsx';

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

test('has tabIndex of props.tabIndex if specified and tabbableOnListItemFocus is true', () => {
  const wrapper = shallow(
    <ListItemText primaryText='Hello' tabIndex={3} tabbableOnListItemFocus />
  );
  assert.equal(wrapper.find('.mdc-list-item__text').props().tabIndex, 3);
});

test('has tabIndex of -1 if tabbableOnListItemFocus is false', () => {
  const wrapper = shallow(
    <ListItemText primaryText='Hello' childrenTabIndex={3} />
  );
  assert.equal(wrapper.find('.mdc-list-item__text').props().tabIndex, -1);
});
