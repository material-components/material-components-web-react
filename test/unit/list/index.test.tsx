import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount} from 'enzyme';
import List, {
  ListItem, ListItemProps, // eslint-disable-line no-unused-vars
} from '../../../packages/list/index';
import {coerceForTesting} from '../helpers/types';

suite('List');

const children: (key?: number) => React.ReactElement<ListItemProps<HTMLDivElement>>
  = (key: number = 0) => (<ListItem key={key}><div>meow</div></ListItem>);

const threeChildren: () => React.ReactElement<ListItemProps<HTMLDivElement>>[]
  = () => [0, 1, 2].map((key) => children(key));

test('creates foundation', () => {
  const wrapper = shallow<List>(<List>
    {children()}
  </List>);
  assert.exists(wrapper.instance().foundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('calls foundation.setSingleSelection when props.singleSelection changes from false to true', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().foundation.setSingleSelection = td.func();
  wrapper.setProps({singleSelection: true});
  td.verify(wrapper.instance().foundation.setSingleSelection(true), {
    times: 1,
  });
});

test('calls foundation.setSingleSelection when props.singleSelection changes from true to false', () => {
  const wrapper = mount<List>(<List singleSelection>{children()}</List>);
  wrapper.instance().foundation.setSingleSelection = td.func();
  wrapper.setProps({singleSelection: false});
  td.verify(wrapper.instance().foundation.setSingleSelection(false), {
    times: 1,
  });
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from false to true', () => {
  const wrapper = mount<List>(<List wrapFocus={false}>{children()}</List>);
  wrapper.instance().foundation.setWrapFocus = td.func();
  wrapper.setProps({wrapFocus: true});
  td.verify(wrapper.instance().foundation.setWrapFocus(true), {times: 1});
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from true to false', () => {
  const wrapper = mount<List>(<List wrapFocus>{children()}</List>);
  wrapper.instance().foundation.setWrapFocus = td.func();
  wrapper.setProps({wrapFocus: false});
  td.verify(wrapper.instance().foundation.setWrapFocus(false), {times: 1});
});

test('calls foundation.setSelectedIndex when props.selectedIndex changes', () => {
  const wrapper = mount<List>(<List selectedIndex={0}>{children()}</List>);
  wrapper.instance().foundation.setSelectedIndex = td.func();
  wrapper.setProps({selectedIndex: 1});
  td.verify(wrapper.instance().foundation.setSelectedIndex(1), {times: 1});
});

test('calls foundation.setVerticalOrientation when \'aria-orientation\' changes from vertical to horizontal', () => {
  const wrapper = mount<List>(<List aria-orientation='vertical'>{children()}</List>);
  wrapper.instance().foundation.setVerticalOrientation = td.func();
  wrapper.setProps({'aria-orientation': 'horizontal'});
  td.verify(wrapper.instance().foundation.setVerticalOrientation(false), {
    times: 1,
  });
});

test('calls foundation.setVerticalOrientation when \'aria-orientation\' changes from horizontal to vertical', () => {
  const wrapper = mount<List>(<List aria-orientation='horizontal'>{children()}</List>);
  wrapper.instance().foundation.setVerticalOrientation = td.func();
  wrapper.setProps({'aria-orientation': 'vertical'});
  td.verify(wrapper.instance().foundation.setVerticalOrientation(true), {
    times: 1,
  });
});

test('classNames adds classes', () => {
  const wrapper = shallow(<List className='test-class-name'>{children()}</List>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list--non-interactive class if props.nonInteractive is true', () => {
  const wrapper = shallow(<List nonInteractive>{children()}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--non-interactive'));
});

test('has mdc-list--dense class if props.dense is true', () => {
  const wrapper = shallow(<List dense>{children()}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--dense'));
});

test('has mdc-list--avatar-list class if props.avatarList is true', () => {
  const wrapper = shallow(<List avatarList>{children()}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--avatar-list'));
});

test('has mdc-list--two-line class if props.twoLine is true', () => {
  const wrapper = shallow(<List twoLine>{children()}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--two-line'));
});

test('#adapter.getListItemCount returns number of list items', () => {
  const wrapper = mount<List>(
    <List>
      {threeChildren()}
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.getListItemCount returns correct number of list items if List has a non-item child', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem id='item1'><div>meow</div></ListItem>
      <ListItem id='item2'><div>meow</div></ListItem>
      <ListItem id='item3'><div>meow</div></ListItem>
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.setAttributeForElementIndex updates state.listItemAttributes', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().adapter.setAttributeForElementIndex(1, 'tabindex', '0');
  assert.equal(wrapper.state().listItemAttributes[1]['tabIndex'], 0);
});

test('#adapter.removeAttributeForElementIndex removes attribute from state.listItemAttributes if it exists', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.setState({listItemAttributes: {1: {tabIndex: 0}}});
  wrapper.instance().adapter.removeAttributeForElementIndex(1, 'tabindex');
  assert.isFalse(
    wrapper.state().listItemAttributes[1].hasOwnProperty('tabIndex')
  );
});

test('#adapter.removeAttributeForElementIndex does nothing if attribute is not in state.listItemAttributes', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().adapter.removeAttributeForElementIndex(1, 'tabindex');
  assert.isFalse(wrapper.state().listItemAttributes.hasOwnProperty(1));
});

test('#adapter.addClassForElementIndex updates state.listItemClassNames if no classes have been added', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().adapter.addClassForElementIndex(1, 'class1');
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.addClassForElementIndex updates state.listItemClassNames if other classes have been added', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.state().listItemClassNames[1] = ['test'];
  wrapper.instance().adapter.addClassForElementIndex(1, 'class1');
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
  assert.isTrue(wrapper.state().listItemClassNames[1].indexOf('test') >= 0);
});

test('#adapter.removeClassForElementIndex removes class from state.listItemClassNames if it exists', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.state().listItemClassNames[1] = ['class1'];
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.removeClassForElementIndex does nothing if class is not in state.listItemClassNames', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.state().listItemClassNames[1] = [];
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames[1].indexOf('class1') >= 0);
});

test('#adapter.removeClassForElementIndex does nothing if index is not in state.listItemClassNames', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().adapter.removeClassForElementIndex(1, 'class1');
  assert.isFalse(wrapper.state().listItemClassNames.hasOwnProperty(1));
});

test('#adapter.setTabIndexForListItemChildren updates state.listItemChildrenTabIndex', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  // wrapper.state().listItemClassNames[1] = -1;
  wrapper.instance().adapter.setTabIndexForListItemChildren(1, 0);
  assert.equal(wrapper.state().listItemChildrenTabIndex[1], 0);
});

test('#adapter.focusItemAtIndex sets state.focusListItemAtIndex', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().adapter.focusItemAtIndex(1);
  assert.equal(wrapper.state().focusListItemAtIndex, 1);
});

test('#adapter.followHref sets state.followHrefAtIndex', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().adapter.followHref(1);
  assert.equal(wrapper.state().followHrefAtIndex, 1);
});

test('#adapter.toggleCheckbox sets state.toggleCheckboxAtIndex', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().adapter.toggleCheckbox(1);
  assert.equal(wrapper.state().toggleCheckboxAtIndex, 1);
});

test('#handleKeyDown calls #foudation.handleKeydown', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleKeydown = td.func();
  const evt = coerceForTesting<React.KeyboardEvent>({persist: () => {}});
  wrapper.instance().handleKeyDown(evt, 1);
  td.verify(wrapper.instance().foundation.handleKeydown(evt, true, 1), {
    times: 1,
  });
});

test('#handleKeyDown calls #props.handleSelect if key is enter', () => {
  const handleSelect = coerceForTesting<(selectedIndex: number) => void>(td.func());
  const wrapper = shallow<List>(<List handleSelect={handleSelect}>{children()}</List>);
  const evt = coerceForTesting<React.KeyboardEvent>({persist: () => {}, key: 'Enter'});
  wrapper.instance().handleKeyDown(evt, 1);
  td.verify(handleSelect(1), {times: 1});
});

test('#handleClick calls #foudation.handleClick', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  const target = {type: 'span'};
  const evt = coerceForTesting<React.MouseEvent<HTMLSpanElement>>({target});
  wrapper.instance().foundation.handleClick = td.func();
  wrapper.instance().handleClick(evt, 1);
  td.verify(wrapper.instance().foundation.handleClick(1, false), {times: 1});
});

test('#handleClick calls #props.handleSelect', () => {
  const handleSelect = coerceForTesting<(selectedIndex: number) => void>(td.func());
  const target = {type: 'span'};
  const evt = coerceForTesting<React.MouseEvent<HTMLSpanElement>>({target});
  const wrapper = shallow<List>(<List handleSelect={handleSelect}>{children()}</List>);
  wrapper.instance().handleClick(evt, 1);
  td.verify(handleSelect(1), {times: 1});
});

test('#handleFocus calls #foudation.handleFocusIn', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleFocusIn = td.func();
  const evt = coerceForTesting<React.FocusEvent>({});
  wrapper.instance().handleFocus(evt, 1);
  td.verify(wrapper.instance().foundation.handleFocusIn(evt, 1), {times: 1});
});

test('#handleBlur calls #foudation.handleFocusOut', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleFocusOut = td.func();
  const evt = coerceForTesting<React.FocusEvent>({});
  wrapper.instance().handleBlur(evt, 1);
  td.verify(wrapper.instance().foundation.handleFocusOut(evt, 1), {
    times: 1,
  });
});

test('#renderListItem renders default list item at index 0', () => {
  const wrapper = mount(
    <List>
      {threeChildren()}
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
      {threeChildren()}
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
      {threeChildren()}
    </List>
  );
  wrapper.setState({focusListItemAtIndex: 1});
  const children = wrapper.children().props().children;
  assert.isFalse(children[0].props.shouldFocus);
  assert.isTrue(children[1].props.shouldFocus);
  assert.isFalse(children[2].props.shouldFocus);
});

test(
  '#renderListItem renders list item with prop.shouldFollowHref true ' +
    'if its index is state.followHrefAtIndex',
  () => {
    const wrapper = mount(
      <List>
        {threeChildren()}
      </List>
    );
    wrapper.setState({followHrefAtIndex: 1});
    const children = wrapper.children().props().children;
    assert.isFalse(children[0].props.shouldFollowHref);
    assert.isTrue(children[1].props.shouldFollowHref);
    assert.isFalse(children[2].props.shouldFollowHref);
  }
);

test(
  '#renderListItem renders list item with prop.shouldToggleCheckbox true ' +
    'if its index is state.toggleCheckboxAtIndex',
  () => {
    const wrapper = mount(
      <List>
        {threeChildren()}
      </List>
    );
    wrapper.setState({toggleCheckboxAtIndex: 1});
    const children = wrapper.children().props().children;
    assert.isFalse(children[0].props.shouldToggleCheckbox);
    assert.isTrue(children[1].props.shouldToggleCheckbox);
    assert.isFalse(children[2].props.shouldToggleCheckbox);
  }
);

test('#renderListItem renders list item with state.listItemAttributes at index as prop.attributesFromList', () => {
  const wrapper = mount(
    <List>
      {threeChildren()}
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
      {threeChildren()}
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
      {threeChildren()}
    </List>
  );
  wrapper.setState({listItemChildrenTabIndex: {1: 0}});
  const children = wrapper.children().props().children;
  assert.equal(children[0].props.childrenTabIndex, -1);
  assert.equal(children[1].props.childrenTabIndex, 0);
  assert.equal(children[2].props.childrenTabIndex, -1);
});

test('first item is selected if props.selectedIndex is 0', () => {
  const wrapper = mount<List>(
    <List singleSelection selectedIndex={0}>
      {threeChildren()}
    </List>
  );
  assert.isTrue(wrapper.state().listItemAttributes[0]['aria-selected']);
});

test('renders a list with default tag', () => {
  const wrapper = shallow(<List>{children()}</List>);
  assert.equal(wrapper.type(), 'ul');
});

test('renders a list with a nav tag', () => {
  const wrapper = shallow(<List tag='nav'>{children()}</List>);
  assert.equal(wrapper.type(), 'nav');
});
