import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import List from '../../../packages/list';
import {ListItem} from '../../../packages/list';

suite('List');

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

test('classNames adds classes', () => {
  const wrapper = shallow(<List className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list--non-interactive class if props.nonInteractive is true', () => {
  const wrapper = shallow(<List nonInteractive />);
  assert.isTrue(wrapper.hasClass('mdc-list--non-interactive'));
});

test('has mdc-list--dense class if props.dense is true', () => {
  const wrapper = shallow(<List dense />);
  assert.isTrue(wrapper.hasClass('mdc-list--dense'));
});

test('has mdc-list--avatar-list class if props.avatarList is true', () => {
  const wrapper = shallow(<List avatarList />);
  assert.isTrue(wrapper.hasClass('mdc-list--avatar-list'));
});

test('has mdc-list--two-line class if props.twoLine is true', () => {
  const wrapper = shallow(<List twoLine />);
  assert.isTrue(wrapper.hasClass('mdc-list--two-line'));
});

test('#adapter.getListItemCount returns number of list items', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.getListItemCount returns correct number of list items if List has a non-item child', () => {
  const wrapper = mount(
    <List>
      <ListItem id='item1' />
      <ListItem id='item2' />
      <div />
      <ListItem id='item3' />
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.setAttributeForElementIndex updates state.listItemAttributes', () => {
  const wrapper = mount(<List/>);
  wrapper.instance().adapter.setAttributeForElementIndex(1, 'tabindex', 0);
  assert.equal(wrapper.state().listItemAttributes[1]['tabIndex'], 0);
});

test('#adapter.removeAttributeForElementIndex removes attribute from state.listItemAttributes if it exists', () => {
  const wrapper = mount(<List/>);
  wrapper.setState({listItemAttributes: {1: {'tabIndex': 0}}});
  wrapper.instance().adapter.removeAttributeForElementIndex(1, 'tabindex');
  assert.isFalse(wrapper.state().listItemAttributes[1].hasOwnProperty('tabIndex'));
});

test('#adapter.removeAttributeForElementIndex does nothing if attribute is not in state.listItemAttributes', () => {
  const wrapper = mount(<List/>);
  wrapper.instance().adapter.removeAttributeForElementIndex(1, 'tabindex');
  assert.isFalse(wrapper.state().listItemAttributes.hasOwnProperty(1));
});

test('#adapter.addClassForElementIndex updates state.listItemClassNames if no classes have been added', () => {
  const wrapper = mount(<List/>);
  wrapper.instance().adapter.addClassForElementIndex(1, 'class1');
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.addClassForElementIndex updates state.listItemClassNames if other classes have been added', () => {
  const wrapper = mount(<List/>);
  wrapper.state().listItemClassNames[1] = ['test'];
  wrapper.instance().adapter.addClassForElementIndex(1, 'class1');
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('test') >= 0);
});

test('#adapter.removeClassForElementIndex removes class from state.listItemClassNames if it exists', () => {
  const wrapper = mount(<List/>);
  wrapper.state().listItemClassNames[1] = ['class1'];
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.removeClassForElementIndex does nothing if class is not in state.listItemClassNames', () => {
  const wrapper = mount(<List/>);
  wrapper.state().listItemClassNames[1] = [];
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.removeClassForElementIndex does nothing if index is not in state.listItemClassNames', () => {
  const wrapper = mount(<List/>);
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames.hasOwnProperty(1));
});

test('#adapter.setTabIndexForListItemChildren updates state.listItemChildrenTabIndex', () => {
  const wrapper = mount(<List/>);
  wrapper.state().listItemClassNames[1] = -1;
  wrapper.instance().adapter.setTabIndexForListItemChildren(1, 0);
  assert.equal(wrapper.state().listItemChildrenTabIndex[1], 0);
});

test('#adapter.focusItemAtIndex sets state.focusListItemAtIndex', () => {
  const wrapper = shallow(<List />);
  wrapper.instance().adapter.focusItemAtIndex(1);
  assert.equal(wrapper.state().focusListItemAtIndex, 1);
});

test('#adapter.followHref sets state.followHrefAtIndex', () => {
  const wrapper = shallow(<List />);
  wrapper.instance().adapter.followHref(1);
  assert.equal(wrapper.state().followHrefAtIndex, 1);
});

test('#adapter.toggleCheckbox sets state.toggleCheckboxAtIndex', () => {
  const wrapper = shallow(<List />);
  wrapper.instance().adapter.toggleCheckbox(1);
  assert.equal(wrapper.state().toggleCheckboxAtIndex, 1);
});

test('#handleKeyDown calls #foudation.handleKeydown', () => {
  const wrapper = shallow(<List/>);
  wrapper.instance().foundation_.handleKeydown = td.func();
  const evt = {persist: () => {}};
  wrapper.instance().handleKeyDown(evt, 1);
  td.verify(wrapper.instance().foundation_.handleKeydown(evt, true, 1), {times: 1});
});

test('#handleKeyDown calls #props.handleSelect if key is enter', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<List handleSelect={handleSelect}/>);
  const evt = {persist: () => {}, key: 'Enter'};
  wrapper.instance().handleKeyDown(evt, 1);
  td.verify(handleSelect(1), {times: 1});
});

test('#handleClick calls #foudation.handleClick', () => {
  const wrapper = shallow(<List/>);
  wrapper.instance().foundation_.handleClick = td.func();
  wrapper.instance().handleClick({target: {type: 'span'}}, 1);
  td.verify(wrapper.instance().foundation_.handleClick(1, false), {times: 1});
});

test('#handleClick calls #props.handleSelect', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<List handleSelect={handleSelect}/>);
  wrapper.instance().handleClick({target: {type: 'span'}}, 1);
  td.verify(handleSelect(1), {times: 1});
});

test('#handleFocus calls #foudation.handleFocusIn', () => {
  const wrapper = shallow(<List/>);
  wrapper.instance().foundation_.handleFocusIn = td.func();
  const evt = {};
  wrapper.instance().handleFocus(evt, 1);
  td.verify(wrapper.instance().foundation_.handleFocusIn(evt, 1), {times: 1});
});

test('#handleBlur calls #foudation.handleFocusOut', () => {
  const wrapper = shallow(<List/>);
  wrapper.instance().foundation_.handleFocusOut = td.func();
  const evt = {};
  wrapper.instance().handleBlur(evt, 1);
  td.verify(wrapper.instance().foundation_.handleFocusOut(evt, 1), {times: 1});
});

test('#renderListItem renders default list item at index 0', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  const listItemProps = wrapper.children().props().children[0].props;
  assert.isFalse(listItemProps.shouldFocus);
  assert.isFalse(listItemProps.shouldFollowHref);
  assert.isFalse(listItemProps.shouldToggleCheckbox);
  assert.equal(listItemProps.attributesFromList['tabIndex'], 0);
  assert.isEmpty(listItemProps.classNamesFromList);
  assert.equal(listItemProps.childrenTabIndex, -1);
});

test('#renderListItem renders default list item at index not 0', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  const listItemProps = wrapper.children().props().children[1].props;

  assert.isFalse(listItemProps.shouldFocus);
  assert.isFalse(listItemProps.shouldFollowHref);
  assert.isFalse(listItemProps.shouldToggleCheckbox);
  assert.isEmpty(listItemProps.attributesFromList);
  assert.isEmpty(listItemProps.classNamesFromList);
  assert.equal(listItemProps.childrenTabIndex, -1);
});

test('#renderListItem renders list item with prop.shouldFocus true if its index is state.focusListItemAtIndex', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  wrapper.setState({focusListItemAtIndex: 1});

  const children = wrapper.children().props().children;
  assert.isFalse(children[0].props.shouldFocus);
  assert.isTrue(children[1].props.shouldFocus);
  assert.isFalse(children[2].props.shouldFocus);
});

test('#renderListItem renders list item with prop.shouldFollowHref true ' +
'if its index is state.followHrefAtIndex', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  wrapper.setState({followHrefAtIndex: 1});
  const children = wrapper.children().props().children;
  assert.isFalse(children[0].props.shouldFollowHref);
  assert.isTrue(children[1].props.shouldFollowHref);
  assert.isFalse(children[2].props.shouldFollowHref);
});

test('#renderListItem renders list item with prop.shouldToggleCheckbox true ' +
'if its index is state.toggleCheckboxAtIndex', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  wrapper.setState({toggleCheckboxAtIndex: 1});

  const children = wrapper.children().props().children;
  assert.isFalse(children[0].props.shouldToggleCheckbox);
  assert.isTrue(children[1].props.shouldToggleCheckbox);
  assert.isFalse(children[2].props.shouldToggleCheckbox);
});

test('#renderListItem renders list item with state.listItemAttributes at index as prop.attributesFromList', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  const attributes = {tabIndex: 0};
  wrapper.setState({listItemAttributes: {1: attributes}});

  const children = wrapper.children().props().children;
  assert.isEmpty(children[0].props.attributesFromList);
  assert.equal(children[1].props.attributesFromList, attributes);
  assert.isEmpty(children[2].props.attributesFromList);
});

test('#renderListItem renders list item with state.listItemClassNames at index as prop.classNamesFromList', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  const classes = ['test-class'];
  wrapper.setState({listItemClassNames: {1: classes}});

  const children = wrapper.children().props().children;
  assert.isEmpty(children[0].props.classNamesFromList);
  assert.equal(children[1].props.classNamesFromList, classes);
  assert.isEmpty(children[2].props.classNamesFromList);
});

test('#renderListItem renders list item with state.listItemChildrenTabIndex at index as prop.childrenTabIndex', () => {
  const wrapper = mount(
    <List>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  wrapper.setState({listItemChildrenTabIndex: {1: 0}});

  const children = wrapper.children().props().children;
  assert.equal(children[0].props.childrenTabIndex, -1);
  assert.equal(children[1].props.childrenTabIndex, 0);
  assert.equal(children[2].props.childrenTabIndex, -1);
});

test('first item is selected if props.selectedIndex is 0', () => {
  const wrapper = mount(
    <List singleSelection selectedIndex={0}>
      <ListItem/>
      <ListItem/>
      <ListItem/>
    </List>
  );
  assert.isTrue(wrapper.state().listItemAttributes[0]['aria-selected']);
});

test('renders a list with default tag', () => {
  const wrapper = shallow(<List />);
  assert.equal(wrapper.type(), 'ul');
})

test('renders a list with a nav tag', () => {
  const wrapper = shallow(<List tag='nav' />);
  assert.equal(wrapper.type(), 'nav');
});
