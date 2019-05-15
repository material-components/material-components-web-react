import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount} from 'enzyme';
import {MenuList} from '../../../packages/menu/index';
import List from '../../../packages/list/index';
import {MDCListIndex} from '@material/list/types';
import {coerceForTesting} from '../helpers/types';

suite('MenuList');

test('classNames adds classes', () => {
  const wrapper = mount(<MenuList className='test-class-name' />);
  assert.isTrue(wrapper.getDOMNode().classList.contains('mdc-list'));
  assert.isTrue(wrapper.getDOMNode().classList.contains('test-class-name'));
});

test('role is defaulted to menu', () => {
  const wrapper = mount(<MenuList />);
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'menu');
});

test('role is set to props.role', () => {
  const wrapper = mount(<MenuList role='menuitem' />);
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'menuitem');
});

test('aria-hidden is defaulted to true', () => {
  const wrapper = mount(<MenuList />);
  assert.equal(wrapper.getDOMNode().getAttribute('aria-hidden'), 'true');
});

test('aria-hidden is set to props.ariaHidden', () => {
  const wrapper = mount(<MenuList aria-hidden={false} />);
  assert.equal(wrapper.getDOMNode().getAttribute('aria-hidden'), 'false');
});

test('#handleSelect calls props.handleSelect', () => {
  const handleSelect = td.func<
    (activatedItemIndex: number, selected: MDCListIndex) => void
  >();
  const wrapper = shallow(<MenuList handleSelect={handleSelect} />);
  coerceForTesting<MenuList>(wrapper.instance()).handleSelect!(0, 0);
  td.verify(handleSelect(0, 0), {times: 1});
});

test('#handleSelect calls props.handleItemAction', () => {
  const handleItemAction = td.func<(listItem: Element) => void>();
  const wrapper = mount(
    <MenuList handleItemAction={handleItemAction}>
      <button className='mdc-list-item'>text</button>
    </MenuList>
  );
  coerceForTesting<MenuList>(wrapper.instance()).handleSelect!(0, 0);
  td.verify(handleItemAction(wrapper.find('.mdc-list-item').getDOMNode()), {
    times: 1,
  });
});

// These tests with innerRef could be a global set of tests for an HOC
test('innerRef as function as function gets called with List', () => {
  const innerRef = td.func<(list: List | null) => void>();
  const wrapper = mount(<MenuList innerRef={innerRef} />);
  const list = coerceForTesting<List>(wrapper.childAt(0).instance());
  td.verify(innerRef(list), {times: 1});
});

test('innerRef as refObject gets called with List', () => {
  const innerRef = React.createRef<List>();
  const wrapper = mount(<MenuList innerRef={innerRef} />);
  const list = coerceForTesting<List>(wrapper.childAt(0).instance());
  assert.equal(innerRef.current, list);
});
