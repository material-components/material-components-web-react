import * as React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import * as td from 'testdouble';
import {ListItem} from '../../../packages/list/index';
import {coerceForTesting} from '../helpers/types';

suite('ListItem');

test('classNames adds classes', () => {
  const wrapper = shallow(<ListItem className='test-class-name'><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('classNamesFromList adds classes', () => {
  const wrapper = shallow(
    <ListItem classNamesFromList={['test-class-name']}><div>meow</div></ListItem>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('attributesFromList adds props', () => {
  const wrapper = shallow(<ListItem attributesFromList={{tabIndex: 0}}><div>meow</div></ListItem>);
  assert.equal(wrapper.props().tabIndex, 0);
});

test('calls focus when props.shouldFocus changes from false to true', () => {
  const wrapper = mount<ListItem<HTMLElement>>(<ListItem><div>meow</div></ListItem>);
  wrapper.instance().focus = coerceForTesting<() => void>(td.func());
  wrapper.setProps({shouldFocus: true});
  td.verify(wrapper.instance().focus(), {times: 1});
});

test('calls followHref when props.shouldFollowHref changes from false to true', () => {
  const wrapper = mount<ListItem<HTMLElement>>(<ListItem><div>meow</div></ListItem>);
  wrapper.instance().followHref = coerceForTesting<() => void>(td.func());
  wrapper.setProps({shouldFollowHref: true});
  td.verify(wrapper.instance().followHref(), {times: 1});
});

test('calls toggleCheckbox when props.shouldToggleCheckbox changes from false to true', () => {
  const wrapper = mount<ListItem<HTMLElement>>(<ListItem><div>meow</div></ListItem>);
  wrapper.instance().toggleCheckbox = coerceForTesting<() => void>(td.func());
  wrapper.setProps({shouldToggleCheckbox: true});
  td.verify(wrapper.instance().toggleCheckbox(), {times: 1});
});

test('#focus focuses the listItemElement_', () => {
  const wrapper = mount<ListItem<HTMLElement>>(<ListItem><div>meow</div></ListItem>);
  wrapper.instance().listItemElement_.current!.focus = coerceForTesting<() => void>(td.func());
  wrapper.instance().focus();
  td.verify(wrapper.instance().listItemElement_.current!.focus(), {times: 1});
});

test('#followHref simulates a click on the listItemElement_ if it has href', () => {
  const wrapper = mount<ListItem<HTMLAnchorElement>>(<ListItem><div>meow</div></ListItem>);
  wrapper.instance().listItemElement_.current!.href = 'https://google.com';
  wrapper.instance().listItemElement_.current!.click = coerceForTesting<() => void>(td.func());
  wrapper.instance().followHref();
  td.verify(wrapper.instance().listItemElement_.current!.click(), {times: 1});
});

test('passes props.childrenTabIndex to children as props.tabIndex', () => {
  const wrapper = mount(
    <ListItem childrenTabIndex={2}>
      <div className='list-item-child' />
    </ListItem>
  );
  assert.equal(wrapper.find('.list-item-child').props().tabIndex, 2);
});

test('renders a list item with default tag', () => {
  const wrapper = shallow(<ListItem><div>Test</div></ListItem>);
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with text content', () => {
  const wrapper = shallow(<ListItem>Test</ListItem>);
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with null as a child', () => {
  const wrapper = shallow(<ListItem><div>Test</div>{null}</ListItem>);
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with an anchor tag', () => {
  const wrapper = shallow(<ListItem tag='a'><div>Test</div></ListItem>);
  assert.equal(wrapper.type(), 'a');
});
