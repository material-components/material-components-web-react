import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import List from '../../../packages/list';
import {ListItem} from '../../../packages/list';

suite.only('List');

test('creates foundation', () => {
  const wrapper = shallow(<List />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<List />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('calls foundation.setSingleSelection when props.singleSelection changes from false to true', () => {
  const wrapper = mount(<List />);
  wrapper.instance().foundation_.setSingleSelection = td.func();
  wrapper.setProps({singleSelection: true});
  td.verify(wrapper.instance().foundation_.setSingleSelection(true), {times: 1});
});

test('calls foundation.setSingleSelection when props.singleSelection changes from true to false', () => {
  const wrapper = mount(<List singleSelection/>);
  wrapper.instance().foundation_.setSingleSelection = td.func();
  wrapper.setProps({singleSelection: false});
  td.verify(wrapper.instance().foundation_.setSingleSelection(false), {times: 1});
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from false to true', () => {
  const wrapper = mount(<List wrapFocus={false}/>);
  wrapper.instance().foundation_.setWrapFocus = td.func();
  wrapper.setProps({wrapFocus: true});
  td.verify(wrapper.instance().foundation_.setWrapFocus(true), {times: 1});
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from true to false', () => {
  const wrapper = mount(<List wrapFocus/>);
  wrapper.instance().foundation_.setWrapFocus = td.func();
  wrapper.setProps({wrapFocus: false});
  td.verify(wrapper.instance().foundation_.setWrapFocus(false), {times: 1});
});

test('calls foundation.setSelectedIndex when props.selectedIndex changes', () => {
  const wrapper = mount(<List selectedIndex={0}/>);
  wrapper.instance().foundation_.setSelectedIndex = td.func();
  wrapper.setProps({selectedIndex: 1});
  td.verify(wrapper.instance().foundation_.setSelectedIndex(1), {times: 1});
});

test('calls foundation.setVerticalOrientation when \'aria-orientation\' changes from vertical to horizontal', () => {
  const wrapper = mount(<List aria-orientation='vertical'/>);
  wrapper.instance().foundation_.setVerticalOrientation = td.func();
  wrapper.setProps({'aria-orientation': 'horizontal'});
  td.verify(wrapper.instance().foundation_.setVerticalOrientation(false), {times: 1});
});

test('calls foundation.setVerticalOrientation when \'aria-orientation\' changes from horizontal to vertical', () => {
  const wrapper = mount(<List aria-orientation='horizontal'/>);
  wrapper.instance().foundation_.setVerticalOrientation = td.func();
  wrapper.setProps({'aria-orientation': 'vertical'});
  td.verify(wrapper.instance().foundation_.setVerticalOrientation(true), {times: 1});
});

test('only the first list item in a list is tabbable', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  assert.equal(wrapper.state().listItemAttributes[0].tabIndex, 0);
  assert.equal(wrapper.state().listItemAttributes[1].tabIndex, -1);
  assert.equal(wrapper.state().listItemAttributes[2].tabIndex, -1);
});

test('state.listItemChildrenTabIndex is set to -1 for all list items on mount', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  assert.equal(wrapper.state().listItemChildrenTabIndex[0], -1);
  assert.equal(wrapper.state().listItemChildrenTabIndex[1], -1);
  assert.equal(wrapper.state().listItemChildrenTabIndex[2], -1);
});

test('state.listItemClassList is updated from props on mount', () => {
  const wrapper = mount(
    <List>
      <ListItem className='class1 class2' />
    </List>
  );
  assert.isTrue(wrapper.state().listItemClassList[0].has('class1'));
  assert.isTrue(wrapper.state().listItemClassList[0].has('class2'));
});

test('#adapter.getListItemCount returns number of list items', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.setAttributeForElementIndex updates state.listItemAttributes', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().adapter.setAttributeForElementIndex(1, 'tabindex', 0);
  assert.equal(wrapper.state().listItemAttributes[1]['tabIndex'], 0);
});

test('#adapter.removeAttributeForElementIndex updates state.listItemAttributes', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().adapter.removeAttributeForElementIndex(1, 'tabindex');
  assert.equal(wrapper.state().listItemAttributes[1]['tabIndex'], null);
});

test('#adapter.addClassForElementIndex updates state.listItemClassList', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().adapter.addClassForElementIndex(1, 'class1');
  assert.isTrue(wrapper.state().listItemClassList[1].has('class1'));
});

test('#adapter.removeClassForElementIndex updates state.listItemClassList', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' className='class1'/>
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassList[1].has('class1'));
});

test('#adapter.setTabIndexForListItemChildren updates state.listItemChildrenTabIndex', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().adapter.setTabIndexForListItemChildren(1, 0);
  assert.equal(wrapper.state().listItemChildrenTabIndex[1], 0);
});

test('#adapter.focusItemAtIndex calls focus() on list item', () => {
  const item1 = {};
  const item2 = {focus: td.func()};
  const item3 = {};
  const wrapper = shallow(<List />);
  wrapper.instance().listItems_ = [item1, item2, item3];
  wrapper.instance().adapter.focusItemAtIndex(1);
  td.verify(item2.focus(), {times: 1});
});

test('#adapter.followHref calls followHref() on list item', () => {
  const item1 = {};
  const item2 = {followHref: td.func()};
  const item3 = {};
  const wrapper = shallow(<List />);
  wrapper.instance().listItems_ = [item1, item2, item3];
  wrapper.instance().adapter.followHref(1);
  td.verify(item2.followHref(), {times: 1});
});

test('#adapter.toggleCheckbox calls toggleCheckbox() on list item', () => {
  const item1 = {};
  const item2 = {toggleCheckbox: td.func()};
  const item3 = {};
  const wrapper = shallow(<List />);
  wrapper.instance().listItems_ = [item1, item2, item3];
  wrapper.instance().adapter.toggleCheckbox(1);
  td.verify(item2.toggleCheckbox(), {times: 1});
});

test('on click calls #props.onClick', () => {
  const onClick = td.func();
  const wrapper = mount(
    <List onClick={onClick}>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('click', evt);
  td.verify(onClick(td.matchers.isA(Object)), {times: 1});
});


test('on click calls #foudation.handleClick', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().foundation_.handleClick = td.func();
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('click', evt);
  td.verify(wrapper.instance().foundation_.handleClick(1, false), {times: 1});
});

test('on keydown calls #props.onKeyDown', () => {
  const onKeyDown = td.func();
  const wrapper = mount(
    <List onKeyDown={onKeyDown}>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('keydown', evt);
  td.verify(onKeyDown(td.matchers.isA(Object)), {times: 1});
});

test('on keydown calls #foudation.handleKeydown', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().foundation_.handleKeydown = td.func();
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('keydown', evt);
  td.verify(wrapper.instance().foundation_.handleKeydown(td.matchers.isA(Object), true, 1), {times: 1});
});

test('on focus calls #props.onFocus', () => {
  const onFocus = td.func();
  const wrapper = mount(
    <List onFocus={onFocus}>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('focus', evt);
  td.verify(onFocus(td.matchers.isA(Object)), {times: 1});
});

test('on focus calls #foudation.handleFocusIn', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().foundation_.handleFocusIn = td.func();
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('focus', evt);
  td.verify(wrapper.instance().foundation_.handleFocusIn(td.matchers.isA(Object), 1), {times: 1});
});

test('on blur calls #props.onBlur', () => {
  const onBlur = td.func();
  const wrapper = mount(
    <List onBlur={onBlur}>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('blur', evt);
  td.verify(onBlur(td.matchers.isA(Object)), {times: 1});
});

test('on keydown calls #foudation.handleFocusOut', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <ListItem id='item3' />
    </List>
  );
  wrapper.instance().foundation_.handleFocusOut = td.func();
  const item2 = wrapper.instance().listItems_[1].listItemElement_.current;
  const evt = {target: item2};
  wrapper.simulate('blur', evt);
  td.verify(wrapper.instance().foundation_.handleFocusOut(td.matchers.isA(Object), 1), {times: 1});
});
