import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount, ShallowWrapper, ReactWrapper} from 'enzyme';
import Menu, {MenuState, MenuList} from '../../../packages/menu/index';
import { coerceForTesting } from '../helpers/types';
// import {MDCMenuFoundation} from '@material/menu/foundation';

suite.only('Menu');

function getFoundation(wrapper: ReactWrapper<any, any, any> | ShallowWrapper<Menu>) {
  return coerceForTesting<MenuState>(wrapper.state()).foundation!;
}

function getAdapter(wrapper: ReactWrapper<any, any, any> | ShallowWrapper<Menu>) {
  // @ts-ignore adapter_ property is protected and we need to override this
  return getFoundation(wrapper).adapter_;
}

test('classNames adds classes', () => {
  const wrapper = shallow(<Menu className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-menu'));
});

test('has state.foundation', () => {
  const wrapper = shallow(<Menu />);
  const foundation = coerceForTesting<MenuState>(wrapper.state()).foundation;
  assert.exists(foundation);
});

test('calls foundation.destroy on unmount', () => {
  const wrapper = shallow(<Menu />);
  const destroy = getFoundation(wrapper).destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(destroy(), {times: 1});
});

test('props.open updates from true to false, will set state.open to false', () => {
  const wrapper = shallow(<Menu open />);
  wrapper.setProps({open: false});
  assert.isFalse(coerceForTesting<MenuState>(wrapper.state()).open);
});

test('props.open updates from false to true, will set state.open to true', () => {
  const wrapper = shallow(<Menu />);
  wrapper.setProps({open: true});
  assert.isTrue(coerceForTesting<MenuState>(wrapper.state()).open);
});

// TODO:
// test('adapter.addClassToElementAtIndex adds a class to a listItem', () => {
// });
// test('adapter.removeClassToElementAtIndex adds a class to a listItem', () => {
// });

test('adapter.addAttributeToElementAtIndex adds a class to a listItem', () => {
  const wrapper = mount(<Menu>
    <MenuList>
      <button className='mdc-list-item'>Meow</button>
    </MenuList>
  </Menu>);
  getAdapter(wrapper).addAttributeToElementAtIndex(0, 'tabindex', '12');
  const listItem = wrapper.find('.mdc-list-item').getDOMNode();
  assert.equal(coerceForTesting<HTMLElement>(listItem).tabIndex, 12);
  wrapper.unmount();
});

test('adapter.removeAttributeToElementAtIndex adds a class to a listItem', () => {
  const wrapper = mount(<Menu>
    <MenuList>
      <button tabIndex={12} className='mdc-list-item'>Meow</button>
    </MenuList>
  </Menu>);
  getAdapter(wrapper).removeAttributeFromElementAtIndex(0, 'tabindex');
  const listItem = wrapper.find('.mdc-list-item').getDOMNode();
  assert.notEqual(coerceForTesting<HTMLElement>(listItem).tabIndex, 12);
  wrapper.unmount();
});