import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import td from 'testdouble';
import Drawer from '../../../packages/drawer/index';

suite('Drawer');

test('creates foundation if dismissible', () => {
  const wrapper = shallow(<Drawer dismissible />);
  assert.exists(wrapper.instance().foundation_);
});

test('creates foundation if modal', () => {
  const wrapper = shallow(<Drawer modal />);
  assert.exists(wrapper.instance().foundation_);
});

test('doesnot create foundation if standard', () => {
  const wrapper = shallow(<Drawer />);
  assert.notExists(wrapper.instance().foundation_);
});

test('when props.open updates to true, #foundation.open is called when dismissible', () => {
  const wrapper = shallow(<Drawer dismissible />);
  wrapper.instance().foundation_.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation_.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called when dismissible', () => {
  const wrapper = shallow(<Drawer open dismissible />);
  wrapper.instance().foundation_.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation_.close(), {times: 1});
});

test('when props.open updates to true, #foundation.open is called when modal', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation_.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called when modal', () => {
  const wrapper = shallow(<Drawer open modal />);
  wrapper.instance().foundation_.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation_.close(), {times: 1});
});

test('when changes from permanent to modal drawer with no foundation, creates a foundation', () => {
  const wrapper = shallow(<Drawer />);
  assert.notExists(wrapper.instance().foundation_);
  wrapper.setProps({modal: true});
  assert.exists(wrapper.instance().foundation_);
});

test('when changes from permanent to dismissible drawer with no foundation, creates a foundation', () => {
  const wrapper = shallow(<Drawer />);
  assert.notExists(wrapper.instance().foundation_);
  wrapper.setProps({dismissible: true});
  assert.exists(wrapper.instance().foundation_);
});

test.only('when changes from dismissible to modal drawer keeps same foundation', () => {
  const wrapper = shallow(<Drawer dismissible />);
  const originalFoundation = wrapper.instance().foundation_;
  wrapper.setProps({modal: true});
  assert.equal(wrapper.instance().foundation_, originalFoundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Drawer dismissible />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('has dismissible drawer class when props.dismissible is true', () => {
  const wrapper = shallow(<Drawer dismissible />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer--dismissible'));
});

test('has modal drawer class when props.modal is true', () => {
  const wrapper = shallow(<Drawer modal />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer--modal'));
});

test('has mdc drawer class', () => {
  const wrapper = shallow(<Drawer />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer'));
});

test('#adapter.addClass should update state with new className', () => {
  const wrapper = mount(<Drawer modal />);
  wrapper.instance().foundation_.adapter_.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass should update state with new className', () => {
  const wrapper = mount(<Drawer modal />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().foundation_.adapter_.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if class is contained in classes', () => {
  const wrapper = mount(<Drawer modal />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class'));
});

test('#adapter.elementHasClass should return true when element has class', () => {
  const wrapper = mount(<Drawer modal />);
  const target = document.createElement('div');
  target.classList.add('test-class-name');
  assert.isTrue(wrapper.instance().adapter.elementHasClass(target, 'test-class-name'));
});

test('#adapter.elementHasClass should return false when element does not have class', () => {
  const wrapper = mount(<Drawer modal><div></div></Drawer>);
  const element = wrapper.childAt(0).childAt(0).getDOMNode();
  const hasClass = wrapper.instance().foundation_.adapter_.elementHasClass(element, 'test-class');
  assert.isFalse(hasClass);
});

test('#adapter.saveFocus updates previousFocus_', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.adapter_.saveFocus();
  assert.exists(wrapper.instance().previousFocus_);
});

test('#adapter.restoreFocus, focuses on component\'s previousFocus element ' +
  'if document.activeElement is contained within drawer element', () => {
  const div = document.createElement('div');
  const focusedElement = document.createElement('button');
  document.body.append(div);
  document.body.append(focusedElement);
  const options = {attachTo: div};
  const wrapper = mount(<Drawer modal><button>meow</button></Drawer>, options);

  wrapper.instance().previousFocus_ = focusedElement;
  const drawerButtonElement = wrapper.childAt(0).childAt(0).getDOMNode();
  drawerButtonElement.focus();
  wrapper.instance().foundation_.adapter_.restoreFocus();

  assert.equal(focusedElement, document.activeElement);
  div.remove();
  focusedElement.remove();
});

test('#adapter.focusActiveNavigationItem focuses on first list item in drawer', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(<Drawer modal><ul>
    <li className='mdc-list-item--activated' tabIndex='0'>list item 1</li>
  </ul></Drawer>, options);
  wrapper.instance().foundation_.adapter_.focusActiveNavigationItem();
  assert.isTrue(document.activeElement.classList.contains('mdc-list-item--activated'));
  div.remove();
});

test('#adapter.notifyClose calls props.onClose', () => {
  const onClose = td.func();
  const wrapper = shallow(<Drawer modal onClose={onClose} />);
  wrapper.instance().foundation_.adapter_.notifyClose();
  td.verify(onClose(), {times: 1});
});

test('#adapter.notifyOpen calls props.onOpen', () => {
  const onOpen = td.func();
  const wrapper = shallow(<Drawer modal onOpen={onOpen} />);
  wrapper.instance().foundation_.adapter_.notifyOpen();
  td.verify(onOpen(), {times: 1});
});

test('#adapter.trapFocus sets state.activeFocusTrap to true', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.adapter_.trapFocus();
  assert.isTrue(wrapper.state().activeFocusTrap);
});

test('#adapter.releaseFocus sets state.activeFocusTrap to false', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.setState({activeFocusTrap: false});
  wrapper.instance().foundation_.adapter_.releaseFocus();
  assert.isFalse(wrapper.state().activeFocusTrap);
});

test('event keydown triggers props.onKeyDown', () => {
  const onKeyDown = td.func();
  const wrapper = shallow(<Drawer onKeyDown={onKeyDown} />);
  const evt = {test: 'test'};
  wrapper.childAt(0).simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('event keydown triggers foundation.handleKeydown', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.handleKeydown = td.func();
  const evt = {test: 'test'};
  wrapper.childAt(0).simulate('keydown', evt);
  td.verify(wrapper.instance().foundation_.handleKeydown(evt), {times: 1});
});

test('event transitionend triggers props.onTransitionEnd', () => {
  const onTransitionEnd = td.func();
  const wrapper = shallow(<Drawer onTransitionEnd={onTransitionEnd} />);
  const evt = {test: 'test'};
  wrapper.childAt(0).simulate('transitionend', evt);
  td.verify(onTransitionEnd(evt), {times: 1});
});

test('event transitionend triggers foundation.handleTransitionEnd', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.handleTransitionEnd = td.func();
  const evt = {test: 'test'};
  wrapper.childAt(0).simulate('transitionend', evt);
  td.verify(wrapper.instance().foundation_.handleTransitionEnd(evt), {times: 1});
});

test('renders child when state.activeFocusTrap is false', () => {
  const wrapper = shallow(<Drawer><span>meow</span></Drawer>);
  const text = wrapper.childAt(0).childAt(0).text();
  assert.equal(text, 'meow');
});

test('renders FocusTrap with children when state.activeFocusTrap is true', () => {
  const wrapper = shallow(<Drawer><span>meow</span></Drawer>);
  wrapper.setState({activeFocusTrap: true});
  assert.equal(wrapper.childAt(0).childAt(0).name(), 'FocusTrap');
  assert.equal(wrapper.childAt(0).childAt(0).childAt(0).text(), 'meow');
});

test('does not render scrim when props.modal is false', () => {
  const wrapper = shallow(<Drawer />);
  assert.equal(wrapper.childAt(1).type(), null);
});

test('renders scrim when props.modal is true', () => {
  const wrapper = shallow(<Drawer modal />);
  assert.isTrue(wrapper.childAt(1).hasClass('mdc-drawer-scrim'));
});

test('click on scrim calls #foundation_.handleScrimClick', () => {
  const wrapper = shallow(<Drawer modal />);
  wrapper.instance().foundation_.handleScrimClick = td.func();
  const scrim = wrapper.childAt(1);
  scrim.simulate('click');
  td.verify(wrapper.instance().foundation_.handleScrimClick(), {times: 1});
});
