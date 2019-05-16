import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {
  ListItemBase as ListItem,
  ListItemState,
} from '../../../packages/list/ListItem';
import {coerceForTesting} from '../helpers/types';

suite('ListItem');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <ListItem className='test-class-name'>
      <div>meow</div>
    </ListItem>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-item classname', () => {
  const wrapper = shallow(
    <ListItem className='test-class-name'>
      <div>meow</div>
    </ListItem>
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item'));
});

test('has activated class if props.activated = true', () => {
  const wrapper = shallow(
    <ListItem activated>
      <div>meow</div>
    </ListItem>
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item--activated'));
});

test('has activated class if props.disabled = true', () => {
  const wrapper = shallow(
    <ListItem disabled>
      <div>meow</div>
    </ListItem>
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item--disabled'));
});

test('has selected class if props.selected = true', () => {
  const wrapper = shallow(
    <ListItem selected>
      <div>meow</div>
    </ListItem>
  );
  assert.isTrue(wrapper.hasClass('mdc-list-item--selected'));
});

test('has role=checkbox if props.checkboxList = true', () => {
  const wrapper = shallow(
    <ListItem checkboxList>
      <div>meow</div>
    </ListItem>
  );
  assert.equal(wrapper.props().role, 'checkbox');
});

test('has role=radio if props.radioList = true', () => {
  const wrapper = shallow(
    <ListItem radioList>
      <div>meow</div>
    </ListItem>
  );
  assert.equal(wrapper.props().role, 'radio');
});

test('has role=menu if props.role = menu', () => {
  const wrapper = shallow(
    <ListItem role='menu'>
      <div>meow</div>
    </ListItem>
  );
  assert.equal(wrapper.props().role, 'menu');
});

test('is anchor tag if tag=a', () => {
  const wrapper = mount<ListItem<HTMLAnchorElement>>(
    <ListItem tag='a'>
      <div>meow</div>
    </ListItem>
  );
  assert.equal(wrapper.find('a').length, 1);
});

test('listitem can have href tag', () => {
  const wrapper = mount<ListItem<HTMLAnchorElement>>(
    <ListItem tag='a' href='google.com'>
      <div>meow</div>
    </ListItem>
  );
  assert.equal(wrapper.props().href, 'google.com');
});

test('renders a list item with default tag', () => {
  const wrapper = shallow(
    <ListItem>
      <div>Test</div>
    </ListItem>
  );
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with text content', () => {
  const wrapper = shallow(<ListItem>Test</ListItem>);
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with null as a child', () => {
  const wrapper = shallow(
    <ListItem>
      <div>Test</div>
      {null}
    </ListItem>
  );
  assert.equal(wrapper.type(), 'li');
});

test('renders a list item with an anchor tag', () => {
  const wrapper = shallow(
    <ListItem tag='a'>
      <div>Test</div>
    </ListItem>
  );
  assert.equal(wrapper.type(), 'a');
});

test('componentWillUnmount calls props.onDestroy()', () => {
  const onDestroy = td.func<(index: number) => void>();
  const wrapper = mount(
    <ListItem onDestroy={onDestroy}>
      <div>Test</div>
    </ListItem>
  );
  wrapper.unmount();
  td.verify(onDestroy(-1), {times: 1});
});

test('handleClick calls props.handleClick and props.onClick', () => {
  const onClick = td.func<(evt: {}) => void>();
  const handleClick = td.func<(evt: {}, index: number) => void>();
  const wrapper = shallow(
    <ListItem onClick={onClick} handleClick={handleClick}>
      <div>Test</div>
    </ListItem>
  );
  const evt = {};
  wrapper.simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
  td.verify(handleClick(evt, -1), {times: 1});
});

test('handleKeyDown calls props.handleKeyDown and props.onKeyDown', () => {
  const onKeyDown = td.func<(evt: {}) => void>();
  const handleKeyDown = td.func<(evt: {}, index: number) => void>();
  const wrapper = shallow(
    <ListItem onKeyDown={onKeyDown} handleKeyDown={handleKeyDown}>
      <div>Test</div>
    </ListItem>
  );
  const evt = {};
  wrapper.simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
  td.verify(handleKeyDown(evt, -1), {times: 1});
});

test('handleFocus calls props.handleFocus and props.onFocus', () => {
  const onFocus = td.func<(evt: {}) => void>();
  const handleFocus = td.func<(evt: {}, index: number) => void>();
  const wrapper = shallow(
    <ListItem onFocus={onFocus} handleFocus={handleFocus}>
      <div>Test</div>
    </ListItem>
  );
  const evt = {};
  wrapper.simulate('focus', evt);
  td.verify(onFocus(evt), {times: 1});
  td.verify(handleFocus(evt, -1), {times: 1});
});

test('handleBlur calls props.handleBlur and props.onBlur', () => {
  const onBlur = td.func<(evt: {}) => void>();
  const handleBlur = td.func<(evt: {}, index: number) => void>();
  const wrapper = shallow(
    <ListItem onBlur={onBlur} handleBlur={handleBlur}>
      <div>Test</div>
    </ListItem>
  );
  const evt = {};
  wrapper.simulate('blur', evt);
  td.verify(onBlur(evt), {times: 1});
  td.verify(handleBlur(evt, -1), {times: 1});
});

test('renders with tabIndex based off of props.getListItemInitialTabIndex', () => {
  const getListItemInitialTabIndex = td.func<(index: number) => number>();
  td.when(getListItemInitialTabIndex(-1)).thenReturn(2);
  const wrapper = mount(
    <ListItem getListItemInitialTabIndex={getListItemInitialTabIndex}>
      Test
    </ListItem>
  );
  assert.equal(coerceForTesting<ListItemState>(wrapper.state()).tabIndex, 2);
});

test('if props.tabIndex updates, then it changes state.tabIndex', () => {
  const wrapper = mount(<ListItem tabIndex={2}>Test</ListItem>);
  wrapper.setProps({tabIndex: 1});
  assert.equal(coerceForTesting<ListItemState>(wrapper.state()).tabIndex, 1);
});

test('get listElements', () => {
  const wrapper = mount(
    <div className='mdc-list'>
      <ListItem>Test</ListItem>
      <ListItem>Test</ListItem>
      <ListItem>Test</ListItem>
    </div>
  );
  const {listElements} = coerceForTesting<ListItem>(
    wrapper.childAt(0).instance()
  );
  assert.equal(listElements.length, 3);
});
