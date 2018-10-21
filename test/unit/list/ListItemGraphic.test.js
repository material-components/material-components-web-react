import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListItemGraphic} from '../../../packages/list';

suite('ListItemGraphic');

test('className adds classes', () => {
  const wrapper = shallow(<ListItemGraphic graphic={<i />} className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-item__graphic class', () => {
  const wrapper = shallow(<ListItemGraphic graphic={<i />} />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__graphic'));
});

test('has tabIndex of props.tabIndex if specified and tabbableOnListItemFocus is true', () => {
  const wrapper = shallow(<ListItemGraphic graphic={<i />} tabIndex={3} tabbableOnListItemFocus/>);
  assert.equal(wrapper.find('.mdc-list-item__graphic').props().tabIndex, 3);
});

test('has tabIndex of -1 if tabbableOnListItemFocus is false', () => {
  const wrapper = shallow(<ListItemGraphic graphic={<i />} childrenTabIndex={3}/>);
  assert.equal(wrapper.find('.mdc-list-item__graphic').props().tabIndex, -1);
});
