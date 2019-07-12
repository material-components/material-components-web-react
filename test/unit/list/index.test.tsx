import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {shallow, mount} from 'enzyme';
import List, {
  ListItem,
  ListItemProps, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '../../../packages/list/index';
import {coerceForTesting} from '../helpers/types';
import {MDCListIndex} from '@material/list/types';

suite('List');

const children = (opts?: {
  key?: number;
  hasCheckbox?: boolean;
}): React.ReactElement<ListItemProps<HTMLDivElement>> => (
  <ListItem key={opts && opts.key}>
    <div>meow</div>
    {opts && opts.hasCheckbox ? <input type='checkbox' /> : null}
  </ListItem>
);

const threeChildren = (): React.ReactElement<ListItemProps<HTMLDivElement>>[] =>
  [0, 1, 2].map((key) => children({key}));

test('creates foundation', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  assert.exists(wrapper.instance().foundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = coerceForTesting<() => void>(td.func());
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('calls foundation.setSingleSelection when props.singleSelection changes from false to true', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().foundation.setSingleSelection = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({singleSelection: true});
  td.verify(wrapper.instance().foundation.setSingleSelection(true), {
    times: 1,
  });
});

test('calls foundation.setSingleSelection when props.singleSelection changes from true to false', () => {
  const wrapper = mount<List>(<List singleSelection>{children()}</List>);
  wrapper.instance().foundation.setSingleSelection = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({singleSelection: false});
  td.verify(wrapper.instance().foundation.setSingleSelection(false), {
    times: 1,
  });
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from false to true', () => {
  const wrapper = mount<List>(<List wrapFocus={false}>{children()}</List>);
  wrapper.instance().foundation.setWrapFocus = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({wrapFocus: true});
  td.verify(wrapper.instance().foundation.setWrapFocus(true), {times: 1});
});

test('calls foundation.setWrapFocus when props.wrapFocus changes from true to false', () => {
  const wrapper = mount<List>(<List wrapFocus>{children()}</List>);
  wrapper.instance().foundation.setWrapFocus = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({wrapFocus: false});
  td.verify(wrapper.instance().foundation.setWrapFocus(false), {times: 1});
});

test('calls foundation.setSelectedIndex when props.selectedIndex changes', () => {
  const wrapper = mount<List>(<List selectedIndex={0}>{children()}</List>);
  wrapper.instance().foundation.setSelectedIndex = coerceForTesting<
    (arg: MDCListIndex) => void
  >(td.func());
  wrapper.setProps({selectedIndex: 1});
  td.verify(wrapper.instance().foundation.setSelectedIndex(1), {times: 1});
});

test('calls foundation.setVerticalOrientation when orientation changes from vertical to horizontal', () => {
  const wrapper = mount<List>(<List orientation='vertical'>{children()}</List>);
  wrapper.instance().foundation.setVerticalOrientation = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({orientation: 'horizontal'});
  td.verify(wrapper.instance().foundation.setVerticalOrientation(false), {
    times: 1,
  });
});

test('calls foundation.setVerticalOrientation when orientation changes from horizontal to vertical', () => {
  const wrapper = mount<List>(
    <List orientation='horizontal'>{children()}</List>
  );
  wrapper.instance().foundation.setVerticalOrientation = coerceForTesting<
    (arg: boolean) => void
  >(td.func());
  wrapper.setProps({orientation: 'vertical'});
  td.verify(wrapper.instance().foundation.setVerticalOrientation(true), {
    times: 1,
  });
});

test('classNames adds classes', () => {
  const wrapper = shallow(
    <List className='test-class-name'>{children()}</List>
  );
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
  const wrapper = mount<List>(<List>{threeChildren()}</List>);
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.getListItemCount returns correct number of list items if List has a non-item child', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem id='item1'>
        <div>meow</div>
      </ListItem>
      <ListItem id='item2'>
        <div>meow</div>
      </ListItem>
      <ListItem id='item3'>
        <div>meow</div>
      </ListItem>
    </List>
  );
  assert.equal(wrapper.instance().adapter.getListItemCount(), 3);
});

test('#adapter.getAttributeForElementIndex can get value of attribute', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  const adapter = wrapper.instance().adapter;
  assert.equal(null, adapter.getAttributeForElementIndex(0, 'role'));
  adapter.setAttributeForElementIndex(0, 'role', 'menu');
  assert.equal('menu', adapter.getAttributeForElementIndex(0, 'role'));
});

test('#adapter.setAttributeForElementIndex calls setAttribute on listItem', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().listElements[0].setAttribute = coerceForTesting<
    (key: string, value: string) => void
  >(td.func());
  wrapper.instance().adapter.setAttributeForElementIndex(0, 'role', 'menu');
  td.verify(wrapper.instance().listElements[0].setAttribute('role', 'menu'), {
    times: 1,
  });
});

test('#adapter.setAttributeForElementIndex call nothing when no children exist', () => {
  const wrapper = mount<List>(<List />);
  assert.doesNotThrow(() =>
    wrapper.instance().adapter.setAttributeForElementIndex(0, 'role', 'menu')
  );
});

test('#adapter.addClassForElementIndex adds classes to state', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  wrapper.instance().adapter.addClassForElementIndex = coerceForTesting<
    (index: number, className: string) => void
  >(td.func());
  wrapper.instance().adapter.addClassForElementIndex(0, 'class4321');
  assert.isTrue(wrapper.state().listItemClassNames[0].includes('class4321'));
});

test('#adapter.addClassForElementIndex adds multiple classes to state', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <div>meow</div>
      </ListItem>
    </List>
  );
  wrapper.instance().adapter.addClassForElementIndex = coerceForTesting<
    (index: number, className: string) => void
  >(td.func());
  wrapper.instance().adapter.addClassForElementIndex(0, 'class4321');
  wrapper.instance().adapter.addClassForElementIndex(0, 'class987');
  assert.isTrue(wrapper.state().listItemClassNames[0].includes('class4321'));
  assert.isTrue(wrapper.state().listItemClassNames[0].includes('class987'));
});

test('#adapter.removeClassForElementIndex removes classname from state.listItemClassNames', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <div>meow</div>
      </ListItem>
    </List>
  );
  wrapper.setState({
    listItemClassNames: {
      0: ['class987', 'class4321'],
    },
  });
  wrapper.instance().adapter.removeClassForElementIndex = coerceForTesting<
    (index: number, className: string) => void
  >(td.func());
  wrapper.instance().adapter.removeClassForElementIndex(0, 'class4321');
  assert.isFalse(wrapper.state().listItemClassNames[0].includes('class4321'));
  assert.isTrue(wrapper.state().listItemClassNames[0].includes('class987'));
});

test('#adapter.setTabIndexForListItemChildren updates the button and anchor tag to have tabindex=0', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <button>click</button>
        <a>link</a>
      </ListItem>
    </List>
  );
  wrapper.instance().adapter.setTabIndexForListItemChildren(0, '0');
  const listItem = wrapper.childAt(0).childAt(0);
  assert.isTrue(
    listItem
      .find('a')
      .html()
      .includes('tabindex="0"')
  );
  assert.isTrue(
    listItem
      .find('button')
      .html()
      .includes('tabindex="0"')
  );
});

test('#adapter.focusItemAtIndex calls focus on the listitem', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  (wrapper.instance().listElements[0] as HTMLElement).focus = coerceForTesting<
    (opts?: any) => void
  >(td.func());
  wrapper.instance().adapter.focusItemAtIndex(0);
  td.verify((wrapper.instance().listElements[0] as HTMLElement).focus(), {
    times: 1,
  });
});

test('#adapter.focusItemAtIndex call nothing when no children exist', () => {
  const wrapper = mount<List>(<List />);
  assert.doesNotThrow(() => wrapper.instance().adapter.focusItemAtIndex(0));
});

test('#adapter.setCheckedCheckboxOrRadioAtIndex does not throw', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  assert.doesNotThrow(() =>
    wrapper.instance().adapter.setCheckedCheckboxOrRadioAtIndex(0, true)
  );
});

test('#adapter.hasCheckboxAtIndex returns false with no checkbox', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  assert.isFalse(wrapper.instance().adapter.hasCheckboxAtIndex(0));
});

test('#adapter.hasCheckboxAtIndex returns true with checkbox', () => {
  const wrapper = mount<List>(
    <List selectedIndex={[]}>
      <ListItem>
        <input type='checkbox' />
      </ListItem>
    </List>
  );
  assert.isTrue(wrapper.instance().adapter.hasCheckboxAtIndex(0));
});

test('#adapter.hasRadioAtIndex returns false with no checkbox', () => {
  const wrapper = mount<List>(<List>{children()}</List>);
  assert.isFalse(wrapper.instance().adapter.hasRadioAtIndex(0));
});

test('#adapter.hasRadioAtIndex returns true with checkbox', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <input type='radio' />
      </ListItem>
    </List>
  );
  assert.isTrue(wrapper.instance().adapter.hasRadioAtIndex(0));
});

test('#adapter.isCheckboxCheckedAtIndex returns false with a non-checked checkbox', () => {
  const wrapper = mount<List>(
    <List selectedIndex={[]}>
      <ListItem>
        <input type='checkbox' />
      </ListItem>
    </List>
  );
  assert.isFalse(wrapper.instance().adapter.isCheckboxCheckedAtIndex(0));
});

test('#adapter.isCheckboxCheckedAtIndex returns true with a checked checkbox', () => {
  const wrapper = mount<List>(
    <List selectedIndex={[]}>
      <ListItem>
        {/* empty onChange to avoid a warning */}
        <input type='checkbox' checked onChange={() => {}} />
      </ListItem>
    </List>
  );
  assert.isTrue(wrapper.instance().adapter.isCheckboxCheckedAtIndex(0));
});

test('#adapter.isFocusInsideList returns true if the list element has focus inside', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <button>click</button>
      </ListItem>
    </List>,
    options
  );
  wrapper
    .instance()
    .listElements[0].querySelector('button')!
    .focus();
  assert.isTrue(wrapper.instance().adapter.isFocusInsideList());
  div.remove();
});

test('#adapter.isFocusInsideList returns true if the list element has focus inside', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <button>click</button>
      </ListItem>
    </List>
  );
  assert.isFalse(wrapper.instance().adapter.isFocusInsideList());
});

test('#adapter.notifyAction calls props.handleSelect with args', () => {
  const handleSelect = td.func<
    (selectedIndex: number, selected: MDCListIndex) => void
  >();
  const wrapper = mount<List>(
    <List handleSelect={handleSelect}>
      <ListItem />
    </List>
  );
  wrapper.instance().adapter.notifyAction(0);
  td.verify(handleSelect(0, -1), {times: 1});
});

test('renders with mdc-list class', () => {
  const wrapper = shallow<List>(<List>{children}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with className', () => {
  const wrapper = shallow<List>(<List className='test-class'>{children}</List>);
  assert.isTrue(wrapper.hasClass('test-class'));
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with mdc-list--non-interactive when non-interactive', () => {
  const wrapper = shallow<List>(<List nonInteractive>{children}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--non-interactive'));
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with mdc-list--dense when dense', () => {
  const wrapper = shallow<List>(<List dense>{children}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--dense'));
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with mdc-list--avatar-list when avatar-list', () => {
  const wrapper = shallow<List>(<List avatarList>{children}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--avatar-list'));
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with mdc-list--two-line when two-line', () => {
  const wrapper = shallow<List>(<List twoLine>{children}</List>);
  assert.isTrue(wrapper.hasClass('mdc-list--two-line'));
  assert.isTrue(wrapper.hasClass('mdc-list'));
});

test('renders with role=group if props.checkboxList', () => {
  const wrapper = shallow<List>(<List checkboxList>{children}</List>);
  assert.equal(wrapper.props().role, 'group');
});

test('renders with role=radiogroup if props.radioList', () => {
  const wrapper = shallow<List>(<List radioList>{children}</List>);
  assert.equal(wrapper.props().role, 'radiogroup');
});

test('renders with role=menu if props.role=menu', () => {
  const wrapper = shallow<List>(<List role='menu'>{children}</List>);
  assert.equal(wrapper.props().role, 'menu');
});

test('renders with role=menu if props.role=menu and props.checkboxList', () => {
  const wrapper = shallow<List>(
    <List role='menu' checkboxList>
      {children}
    </List>
  );
  assert.equal(wrapper.props().role, 'menu');
});

test('renders without aria-orientation by default', () => {
  const wrapper = shallow<List>(<List>{children}</List>);
  assert.equal(wrapper.props()['aria-orientation'], undefined);
});

test('renders without aria-orientation when checkboxList and orientation=vertical (default)', () => {
  const wrapper = shallow<List>(<List checkboxList>{children}</List>);
  assert.equal(wrapper.props()['aria-orientation'], undefined);
});

test('renders with aria-orientation when checkboxList and orientation=horizontal', () => {
  const wrapper = shallow<List>(
    <List checkboxList orientation='horizontal'>
      {children}
    </List>
  );
  assert.equal(wrapper.props()['aria-orientation'], 'horizontal');
});

test('renders with aria-orientation when radioList and orientation=horizontal', () => {
  const wrapper = shallow<List>(
    <List radioList orientation='horizontal'>
      {children}
    </List>
  );
  assert.equal(wrapper.props()['aria-orientation'], 'horizontal');
});

test('renders with overridden aria-orientation when checkboxList, orientation=horizontal and aria-orientation=vertical', () => {
  const wrapper = shallow<List>(
    <List checkboxList orientation='horizontal' aria-orientation='vertical'>
      {children}
    </List>
  );
  assert.equal(wrapper.props()['aria-orientation'], 'vertical');
});

test('renders without aria-orientation when checkboxList, orientation=horizontal and role is overridden', () => {
  const wrapper = shallow<List>(
    <List checkboxList orientation='horizontal' role='menu'>
      {children}
    </List>
  );
  assert.equal(wrapper.props()['aria-orientation'], undefined);
});

test('#onDestroy removes item from state.listItemClassNames', () => {
  const wrapper = mount<List>(
    <List>
      <ListItem>
        <div>meow</div>
      </ListItem>
    </List>
  );
  wrapper.setState({listItemClassNames: {0: ['test']}});
  wrapper.instance().onDestroy(0);
  assert.notExists(wrapper.state().listItemClassNames[0]);
});

test('#handleKeyDown calls #foudation.handleKeydown', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleKeydown = coerceForTesting<
    (evt: KeyboardEvent, isItem: boolean, itemIndex: number) => void
  >(td.func());
  const evt = coerceForTesting<React.KeyboardEvent>({persist: () => {}});
  wrapper.instance().handleKeyDown(evt, 1);
  td.verify(
    wrapper.instance().foundation.handleKeydown(evt.nativeEvent, true, 1),
    {
      times: 1,
    }
  );
});

test('#handleClick calls #foudation.handleClick', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  const target = {type: 'span'};
  const evt = coerceForTesting<React.MouseEvent<HTMLSpanElement>>({target});
  wrapper.instance().foundation.handleClick = coerceForTesting<
    (index: number, toggleCheckbox: boolean) => void
  >(td.func());
  wrapper.instance().handleClick(evt, 1);
  td.verify(wrapper.instance().foundation.handleClick(1, false), {times: 1});
});

test('#handleFocus calls #foudation.handleFocusIn', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleFocusIn = coerceForTesting<
    (e: FocusEvent, itemIndex: number) => void
  >(td.func());
  const evt = coerceForTesting<React.FocusEvent>({});
  wrapper.instance().handleFocus(evt, 1);
  td.verify(wrapper.instance().foundation.handleFocusIn(evt.nativeEvent, 1), {
    times: 1,
  });
});

test('#handleBlur calls #foudation.handleFocusOut', () => {
  const wrapper = shallow<List>(<List>{children()}</List>);
  wrapper.instance().foundation.handleFocusOut = coerceForTesting<
    (e: FocusEvent, itemIndex: number) => void
  >(td.func());
  const evt = coerceForTesting<React.FocusEvent>({});
  wrapper.instance().handleBlur(evt, 1);
  td.verify(wrapper.instance().foundation.handleFocusOut(evt.nativeEvent, 1), {
    times: 1,
  });
});

test('renders 3 list items', () => {
  const wrapper = mount(<List>{threeChildren()}</List>);
  assert.equal(wrapper.childAt(0).children().length, 3);
});

test('renders list items with tabindex=-1 and first with tabindex=0', () => {
  const wrapper = mount(<List>{threeChildren()}</List>);
  const list = wrapper.childAt(0);
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(0).getDOMNode()).tabIndex,
    0
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(1).getDOMNode()).tabIndex,
    -1
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(2).getDOMNode()).tabIndex,
    -1
  );
});

test('renders list items with tabindex=-1 and child at props.selectedIndex tabindex=0', () => {
  const wrapper = mount(<List selectedIndex={1}>{threeChildren()}</List>);
  const list = wrapper.childAt(0);
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(0).getDOMNode()).tabIndex,
    -1
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(1).getDOMNode()).tabIndex,
    0
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(2).getDOMNode()).tabIndex,
    -1
  );
});

test('renders list items with tabindex=-1 and child at props.selectedIndex tabindex=0 as an array', () => {
  const wrapper = mount(
    <List checkboxList selectedIndex={[1]}>
      {children({key: 0, hasCheckbox: true})}
      {children({key: 1, hasCheckbox: true})}
      {children({key: 2, hasCheckbox: true})}
    </List>
  );
  const list = wrapper.childAt(0);
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(0).getDOMNode()).tabIndex,
    -1
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(1).getDOMNode()).tabIndex,
    0
  );
  assert.equal(
    coerceForTesting<HTMLElement>(list.childAt(2).getDOMNode()).tabIndex,
    -1
  );
});

test('renders a list with default tag', () => {
  const wrapper = shallow(<List>{children()}</List>);
  assert.equal(wrapper.type(), 'ul');
});

test('renders a list with a nav tag', () => {
  const wrapper = shallow(<List tag='nav'>{children()}</List>);
  assert.equal(wrapper.type(), 'nav');
});

test('renders a list with children of non-DOM elements', () => {
  const wrapper = shallow(
    <List>
      {}
      {false}
      {'text'}
      {null}
      {undefined}
    </List>
  );
  assert.isTrue(wrapper.children().length === 1);
});
