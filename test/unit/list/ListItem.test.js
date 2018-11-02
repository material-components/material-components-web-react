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

test('#componentDidMount calls #props.init', () => {
  const init = td.func();
  mount(<ListItem init={init} />);
  td.verify(init(), {times: 1});
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

test('passes props.childrenTabIndex to children as props.tabIndex', () => {
  const wrapper = mount(
    <ListItem childrenTabIndex={2}>
      <div className='list-item-child' />
    </ListItem>
  );
  assert.equal(wrapper.find('.list-item-child').props().tabIndex, 2);
});

test('renders a list item with an anchor tag', () => {
  const wrapper = shallow(<ListItem href='https://www.google.com' />);
  assert.equal(wrapper.type(), 'a');
});
