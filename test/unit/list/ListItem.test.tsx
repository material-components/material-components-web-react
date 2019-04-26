import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {ListItem} from '../../../packages/list/index';

suite('ListItem');

test('classNames adds classes', () => {
  const wrapper = shallow(<ListItem className='test-class-name'><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-item classname', () => {
  const wrapper = shallow(<ListItem className='test-class-name'><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('mdc-list-item'));
});

test('has activated class if props.activated = true', () => {
  const wrapper = shallow(<ListItem activated><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('mdc-list-item--activated'));
});

test('has activated class if props.disabled = true', () => {
  const wrapper = shallow(<ListItem disabled><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('mdc-list-item--disabled'));
});

test('has selected class if props.selected = true', () => {
  const wrapper = shallow(<ListItem selected><div>meow</div></ListItem>);
  assert.isTrue(wrapper.hasClass('mdc-list-item--selected'));
});

test('has role=checkbox if props.checkboxList = true', () => {
  const wrapper = shallow(<ListItem checkboxList><div>meow</div></ListItem>);
  assert.equal(wrapper.props().role, 'checkbox');
});

test('has role=radio if props.radioList = true', () => {
  const wrapper = shallow(<ListItem radioList><div>meow</div></ListItem>);
  assert.equal(wrapper.props().role, 'radio');
});

test('has role=menu if props.role = menu', () => {
  const wrapper = shallow(<ListItem role='menu'><div>meow</div></ListItem>);
  assert.equal(wrapper.props().role, 'menu');
});

test('is anchor tag if tag=a', () => {
  const wrapper = mount<ListItem<HTMLAnchorElement>>(<ListItem tag='a'><div>meow</div></ListItem>);
  assert.equal(wrapper.find('a').length, 1);
});

test('listitem can have href tag', () => {
  const wrapper = mount<ListItem<HTMLAnchorElement>>(<ListItem tag='a' href='google.com'><div>meow</div></ListItem>);
  assert.equal(wrapper.props().href, 'google.com');
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

test('componentWillUnmount calls props.onDestroy()', () => {
  const onDestroy = td.func<() => void>();
  const wrapper = shallow(<ListItem onDestroy={onDestroy}><div>Test</div></ListItem>);
  wrapper.unmount();
  td.verify(onDestroy(), {times: 1});
});
