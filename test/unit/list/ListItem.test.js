import React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import td from 'testdouble';
import {ListItem} from '../../../packages/list';

suite('ListItem');

test('classNames adds classes', () => {
  const wrapper = shallow(<ListItem className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('#componentDidUpdate calls #props.updateClassList', () => {
  const updateClassList = td.func();
  const wrapper = shallow(<ListItem updateClassList={updateClassList} />);
  wrapper.setProps({className: 'test-class-name'});
  td.verify(updateClassList(wrapper.instance(), 'test-class-name'), {times: 1});
});

test('#focus focuses the listItemElement_', () => {
  const wrapper = mount(<ListItem />);
  wrapper.instance().listItemElement_.current.focus = td.func();
  wrapper.instance().focus();
  td.verify(wrapper.instance().listItemElement_.current.focus(), {times: 1});
});

test('#followHref simulates a click on the listItemElement_ if it has href', () => {
  const wrapper = mount(<ListItem />);
  wrapper.instance().listItemElement_.current.href = true;
  wrapper.instance().listItemElement_.current.click = td.func();
  wrapper.instance().followHref();
  td.verify(wrapper.instance().listItemElement_.current.click(), {times: 1});
});

test('renders graphic', () => {
  const wrapper = shallow(<ListItem graphic={<i />} />);
  assert.exists(wrapper.find('.mdc-list-item__graphic'));
});

test('renders graphic with tabIndex of props.childrenTabIndex if tabIndex specified', () => {
  const wrapper = shallow(<ListItem graphic={<i tabIndex={0} />} childrenTabIndex={0}/>);
  assert.equal(wrapper.find('.mdc-list-item__graphic').childAt(0).props().tabIndex, 0);
});

test('renders graphic with tabIndex -1 if tabIndex not specified', () => {
  const wrapper = shallow(<ListItem graphic={<i />} childrenTabIndex={0}/>);
  assert.equal(wrapper.find('.mdc-list-item__graphic').childAt(0).props().tabIndex, -1);
});

test('renders text if no secondary text provided', () => {
  const wrapper = shallow(<ListItem primaryText='Hello' />);
  assert.exists(wrapper.find('.mdc-list-item__text'));
});

test('renders primary and secondary text if secondary text provided', () => {
  const wrapper = shallow(<ListItem primaryText='Hello' secondaryText='World' />);
  assert.exists(wrapper.find('.mdc-list-item__primary-text'));
  assert.exists(wrapper.find('.mdc-list-item__secondary-text'));
});

test('renders meta as span element if meta is a string', () => {
  const wrapper = shallow(<ListItem meta='info' />);
  assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'span');
});

test('renders meta element if meta is an anchor element', () => {
  const wrapper = shallow(<ListItem meta={<a />} />);
  assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'a');
});

test('renders meta element if meta is a button element', () => {
  const wrapper = shallow(<ListItem meta={<button />} />);
  assert.equal(wrapper.find('.mdc-list-item__meta').type(), 'button');
});

test('renders meta with tabIndex of props.childrenTabIndex if tabIndex specified', () => {
  const wrapper = shallow(<ListItem meta={<button tabIndex={0} />} childrenTabIndex={0}/>);
  assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, 0);
});

test('renders meta with tabIndex -1 if tabIndex not specified', () => {
  const wrapper = shallow(<ListItem meta={<button />} childrenTabIndex={0}/>);
  assert.equal(wrapper.find('.mdc-list-item__meta').props().tabIndex, -1);
});
