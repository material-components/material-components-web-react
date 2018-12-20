import * as React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import * as td from 'testdouble';
import Drawer from '../../../packages/drawer/index';
import {Options, DeactivateOptions, FocusTrap} from 'focus-trap'; // eslint-disable-line no-unused-vars
import {coerceForTesting} from '../helpers/types';

suite('Drawer');

test('creates foundation if dismissible', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  assert.exists(wrapper.instance().foundation);
});

test('creates foundation if modal', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  assert.exists(wrapper.instance().foundation);
});

test('doesnot create foundation if standard', () => {
  const wrapper = shallow<Drawer>(<Drawer />);
  assert.notExists(wrapper.instance().foundation);
});

test('when props.open updates to true, #foundation.open is called when dismissible', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  wrapper.instance().foundation.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called when dismissible', () => {
  const wrapper = shallow<Drawer>(<Drawer open dismissible />);
  wrapper.instance().foundation.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation.close(), {times: 1});
});

test('when props.open updates to true, #foundation.open is called when modal', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
});

test('when props.open updates to false from true, #foundation.close is called when modal', () => {
  const wrapper = shallow<Drawer>(<Drawer open modal />);
  wrapper.instance().foundation.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation.close(), {times: 1});
});

test('when changes from permanent to modal drawer with no foundation, creates a foundation', () => {
  const wrapper = shallow<Drawer>(<Drawer />);
  assert.notExists(wrapper.instance().foundation);
  wrapper.setProps({modal: true});
  assert.exists(wrapper.instance().foundation);
});

test('when changes from permanent to dismissible drawer with no foundation, creates a foundation', () => {
  const wrapper = shallow<Drawer>(<Drawer />);
  assert.notExists(wrapper.instance().foundation);
  wrapper.setProps({dismissible: true});
  assert.exists(wrapper.instance().foundation);
});

test('when the drawer changes from dismissible to modal the foundation changes ', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  const originalFoundation = wrapper.instance().foundation;
  wrapper.setProps({modal: true});
  assert.notEqual(wrapper.instance().foundation, originalFoundation);
  assert.exists(wrapper.instance().foundation);
});

test('when the drawer changes from dismissible to modal the original foundation calls destroy', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  const destroy = td.func();
  wrapper.instance().foundation = {destroy};
  wrapper.setProps({modal: true});
  td.verify(destroy(), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('has dismissible drawer class when props.dismissible is true', () => {
  const wrapper = shallow<Drawer>(<Drawer dismissible />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer--dismissible'));
});

test('has modal drawer class when props.modal is true', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer--modal'));
});

test('has mdc drawer class', () => {
  const wrapper = shallow<Drawer>(<Drawer />);
  assert.isTrue(wrapper.instance().classes.includes('mdc-drawer'));
});

test('#adapter.addClass should update state with new className', () => {
  const wrapper = mount<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.adapter_.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass should update state with new className', () => {
  const wrapper = mount<Drawer>(<Drawer modal />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().foundation.adapter_.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if class is contained in classes', () => {
  const wrapper = mount<Drawer>(<Drawer modal />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().foundation.adapter_.hasClass('test-class'));
});

test('#adapter.elementHasClass should return true when element has class', () => {
  const wrapper = mount<Drawer>(<Drawer modal />);
  const target = document.createElement('div');
  target.classList.add('test-class-name');
  assert.isTrue(
    wrapper.instance().adapter.elementHasClass(target, 'test-class-name')
  );
});

test('#adapter.elementHasClass should return false when element does not have class', () => {
  const wrapper = mount<Drawer>(
    <Drawer modal>
      <div />
    </Drawer>
  );
  const element = wrapper
    .childAt(0)
    .childAt(0)
    .getDOMNode();
  const hasClass = wrapper
    .instance()
    .foundation.adapter_.elementHasClass(element, 'test-class');
  assert.isFalse(hasClass);
});

test('#adapter.saveFocus updates previousFocus', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.adapter_.saveFocus();
  assert.exists(wrapper.instance().previousFocus);
});
test(
  '#adapter.restoreFocus, focuses on component\'s previousFocus element ' +
    'if document.activeElement is contained within drawer element',
  () => {
    const div = document.createElement('div');
    const focusedElement = document.createElement('button');
    document.body.append(div);
    document.body.append(focusedElement);
    const options = {attachTo: div};
    const wrapper = mount<Drawer>(
      <Drawer modal>
        <button>meow</button>
      </Drawer>,
      options
    );
    wrapper.instance().previousFocus = focusedElement;
    const drawerButtonElement = coerceForTesting<HTMLElement>(wrapper
      .childAt(0)
      .childAt(0)
      .getDOMNode());
    drawerButtonElement.focus();
    wrapper.instance().foundation.adapter_.restoreFocus();
    assert.equal(focusedElement, document.activeElement);
    div.remove();
    focusedElement.remove();
  }
);

test('#adapter.focusActiveNavigationItem focuses on first list item in drawer', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<Drawer>(
    <Drawer modal>
      <ul>
        <li className='mdc-list-item--activated' tabIndex={0}>
          list item 1
        </li>
      </ul>
    </Drawer>,
    options
  );
  wrapper.instance().foundation.adapter_.focusActiveNavigationItem();
  assert.isTrue(
    document.activeElement!.classList.contains('mdc-list-item--activated')
  );
  div.remove();
});

test('#adapter.notifyClose calls props.onClose', () => {
  const onClose = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Drawer>(<Drawer modal onClose={onClose} />);
  wrapper.instance().foundation.adapter_.notifyClose();
  td.verify(onClose(), {times: 1});
});

test('#adapter.notifyOpen calls props.onOpen', () => {
  const onOpen = coerceForTesting<() => void>(td.func());
  const wrapper = shallow<Drawer>(<Drawer modal onOpen={onOpen} />);
  wrapper.instance().foundation.adapter_.notifyOpen();
  td.verify(onOpen(), {times: 1});
});

test('#adapter.trapFocus calls focusTrap.activate if modal variant', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  const activate = coerceForTesting<(activateOptions?: Pick<Options, "onActivate">) => void>(td.func());
  wrapper.instance().focusTrap = coerceForTesting<FocusTrap>({activate});
  wrapper.instance().foundation.adapter_.trapFocus();
  td.verify(activate(), {times: 1});
});

test('#adapter.releaseFocus calls focusTrap.deactivate if modal variant', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  const deactivate = coerceForTesting<(deactivateOptions?: DeactivateOptions) => void>(td.func());
  wrapper.instance().focusTrap = coerceForTesting<FocusTrap>({deactivate});
  wrapper.instance().foundation.adapter_.releaseFocus();
  td.verify(deactivate(), {times: 1});
});

test('event keydown triggers props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<(event: React.KeyboardEvent) => void>(td.func());
  const wrapper = shallow(<Drawer onKeyDown={onKeyDown} />);
  const evt = coerceForTesting<React.KeyboardEvent>({});
  wrapper.childAt(0).simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('event keydown triggers foundation.handleKeydown', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.handleKeydown = td.func();
  const evt = coerceForTesting<React.KeyboardEvent>({});
  wrapper.childAt(0).simulate('keydown', evt);
  td.verify(wrapper.instance().foundation.handleKeydown(evt), {times: 1});
});

test('event transitionend triggers props.onTransitionEnd', () => {
  const onTransitionEnd = coerceForTesting<(event: React.TransitionEvent) => void>(td.func());
  const wrapper = shallow(<Drawer onTransitionEnd={onTransitionEnd} />);
  const evt = coerceForTesting<React.TransitionEvent>({});
  wrapper.childAt(0).simulate('transitionend', evt);
  td.verify(onTransitionEnd(evt), {times: 1});
});

test('event transitionend triggers foundation.handleTransitionEnd', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.handleTransitionEnd = td.func();
  const evt = coerceForTesting<React.TransitionEvent>({});
  wrapper.childAt(0).simulate('transitionend', evt);
  td.verify(wrapper.instance().foundation.handleTransitionEnd(evt), {
    times: 1,
  });
});

test('does not render scrim when props.modal is false', () => {
  const wrapper = shallow(<Drawer />);
  assert.equal(wrapper.childAt(1).type(), null);
});

test('renders scrim when props.modal is true', () => {
  const wrapper = shallow(<Drawer modal />);
  assert.isTrue(wrapper.childAt(1).hasClass('mdc-drawer-scrim'));
});

test('click on scrim calls #foundation.handleScrimClick', () => {
  const wrapper = shallow<Drawer>(<Drawer modal />);
  wrapper.instance().foundation.handleScrimClick = td.func();
  const scrim = wrapper.childAt(1);
  scrim.simulate('click');
  td.verify(wrapper.instance().foundation.handleScrimClick(), {times: 1});
});
