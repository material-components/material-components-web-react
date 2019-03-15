import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow, mount} from 'enzyme';
import MenuSurface, {Corner} from '../../../packages/menu-surface/index';

suite('MenuSurface');

test('classNames adds classes', () => {
  const wrapper = mount(<MenuSurface className='test-class-name' />);
  assert.isTrue(wrapper.childAt(0).hasClass('test-class-name'));
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-menu-surface'));
  wrapper.unmount();
});

test('classList adds classes', () => {
  const wrapper = mount(<MenuSurface />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  assert.isTrue(wrapper.childAt(0).hasClass('test-class-name'));
  wrapper.unmount();
});

test('props.fixed adds fixed class', () => {
  const wrapper = mount(<MenuSurface fixed />);
  assert.isTrue(wrapper.childAt(0).hasClass('mdc-menu-surface--fixed'));
  wrapper.unmount();
});

test('foundation is created', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  assert.exists(wrapper.instance().foundation);
});

test('update to props.open will call foundation.open', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.open = td.func();
  wrapper.setProps({open: true});
  td.verify(wrapper.instance().foundation.open(), {times: 1});
  wrapper.unmount();
});

test('update to props.open sets firstFocusableElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>click</button>
    </MenuSurface>
  );
  wrapper.setProps({open: true});
  assert.equal(
    (wrapper.instance().firstFocusableElement as HTMLElement),
    wrapper.find('button').getDOMNode()
  );
  wrapper.unmount();
});

test('update to props.open sets lastFocusableElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>click</button>
    </MenuSurface>
  );
  wrapper.setProps({open: true});
  assert.equal(
    (wrapper.instance().lastFocusableElement as HTMLElement),
    wrapper.find('button').getDOMNode()
  );
  wrapper.unmount();
});

test('update to props.open from true to false will call foundation.close', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface open />);
  wrapper.instance().foundation.close = td.func();
  wrapper.setProps({open: false});
  td.verify(wrapper.instance().foundation.close(), {times: 1});
  wrapper.unmount();
});

test('foundation.setAbsolutePosition is called when props.coordinates updates', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.setAbsolutePosition = td.func();
  wrapper.setProps({coordinates: {x: 1, y: 11}});
  td.verify(wrapper.instance().foundation.setAbsolutePosition(1, 11), {
    times: 1,
  });
});

test('foundation.setAnchorCorner is called when props.anchorCorner updates', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.setAnchorCorner = td.func();
  wrapper.setProps({anchorCorner: Corner.TOP_RIGHT});
  td.verify(wrapper.instance().foundation.setAnchorCorner(Corner.TOP_RIGHT), {
    times: 1,
  });
});

test('foundation.setAnchorMargin is called when props.anchorMargin updates', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.setAnchorMargin = td.func();
  wrapper.setProps({anchorMargin: {top: 20}});
  td.verify(wrapper.instance().foundation.setAnchorMargin({top: 20}), {
    times: 1,
  });
});

test('foundation.setQuickOpen is called when props.quickOpen updates to true', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.setQuickOpen = td.func();
  wrapper.setProps({quickOpen: true});
  td.verify(wrapper.instance().foundation.setQuickOpen(true), {times: 1});
});

test('foundation.setQuickOpen is called when props.quickOpen updates to false', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface quickOpen />);
  wrapper.instance().foundation.setQuickOpen = td.func();
  wrapper.setProps({quickOpen: false});
  td.verify(wrapper.instance().foundation.setQuickOpen(false), {times: 1});
});

test('foundation.isOpen is true when props.open is true', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface open />);
  assert.isTrue(wrapper.instance().foundation.isOpen());
  wrapper.unmount();
});

test('foundation.isOpen is false when props.open is false', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface open={false} />);
  assert.isFalse(wrapper.instance().foundation.isOpen());
  wrapper.unmount();
});

test('#registerWindowClickListener adds click event handler to window', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.handleBodyClick = td.func();
  wrapper.instance().registerWindowClickListener!();
  const clickEvent = new Event('click');
  window.dispatchEvent(clickEvent);
  td.verify(wrapper.instance().foundation.handleBodyClick(clickEvent), {
    times: 1,
  });
});

test('#deregisterWindowClickListener removes click event handler to window', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.handleBodyClick = td.func();
  wrapper.instance().registerWindowClickListener!();
  wrapper.instance().deregisterWindowClickListener!();
  const clickEvent = new Event('click');
  window.dispatchEvent(clickEvent);
  td.verify(wrapper.instance().foundation.handleBodyClick(clickEvent), {
    times: 0,
  });
});

test('#adapter.notifyOpen calls #registerWindowClickListener', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().registerWindowClickListener = td.func() as () => void;
  wrapper.instance().foundation.adapter_.notifyOpen();
  td.verify(wrapper.instance().registerWindowClickListener!(), {times: 1});
});

test('#adapter.notifyOpen calls onOpen', () => {
  const onOpen = td.func() as () => void;
  const wrapper = shallow<MenuSurface>(<MenuSurface onOpen={onOpen} />);
  wrapper.instance().foundation.adapter_.notifyOpen();
  td.verify(onOpen(), {times: 1});
});

test('#adapter.isFocused returns true if menuSurfaceElement_ is the activeElement', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface tabIndex={-1}>
      <span>hello</span>
    </MenuSurface>,
    options
  );
  (wrapper.getDOMNode() as HTMLDivElement).focus();
  assert.isTrue(wrapper.instance().foundation.adapter_.isFocused());
  wrapper.unmount();
  div.remove();
});

test('#adapter.isFocused returns false if menuSurfaceElement_ is not the activeElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <span>hello</span>
    </MenuSurface>
  );
  assert.isFalse(wrapper.instance().foundation.adapter_.isFocused());
  wrapper.unmount();
});

test('#adapter.saveFocus saves the currently focused element', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  (wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement)
    .focus();
  wrapper.instance().foundation.adapter_.saveFocus();
  assert.equal(
    wrapper.instance().previousFocus,
    (wrapper.find('button').getDOMNode() as HTMLButtonElement)
  );
  wrapper.unmount();
  div.remove();
});

test('#adapter.restoreFocus restores focus to an element within the menuSurfaceElement_', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
      <a href='#'>link</a>
    </MenuSurface>,
    options
  );
  wrapper.instance().previousFocus = wrapper.find('a').getDOMNode() as HTMLAnchorElement;
  (wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement)
    .focus();
  wrapper.instance().foundation.adapter_.restoreFocus();
  assert.equal(document.activeElement, wrapper.find('a').getDOMNode());
  wrapper.unmount();
  div.remove();
});

test('#adapter.isFirstElementFocused returns true if firstFocusableElement is the activeElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().firstFocusableElement = wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement;
  (wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement)
    .focus();
  assert.isTrue(
    wrapper.instance().foundation.adapter_.isFirstElementFocused()
  );
  wrapper.unmount();
});

test('#adapter.isLastElementFocused returns true if lastFocusableElement is the activeElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().lastFocusableElement = wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement;
  (wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement)
    .focus();
  assert.isTrue(wrapper.instance().foundation.adapter_.isLastElementFocused());
  wrapper.unmount();
});

test('#adapter.focusFirstElement focuses on firstFocusableElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().firstFocusableElement = wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement;
  wrapper.instance().foundation.adapter_.focusFirstElement();
  assert.equal(document.activeElement, wrapper.find('button').getDOMNode());
  wrapper.unmount();
});

test('#adapter.focusLastElement focuses on lastFocusableElement', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().lastFocusableElement = wrapper
    .find('button')
    .getDOMNode() as HTMLButtonElement;
  wrapper.instance().foundation.adapter_.focusLastElement();
  assert.equal(document.activeElement, wrapper.find('button').getDOMNode());
  wrapper.unmount();
});

test('#adapter.getInnerDimensions returns width/height of menuSurfaceElement_', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  const dim = wrapper.instance().foundation.adapter_.getInnerDimensions();
  assert.isAbove(dim.width, 0);
  assert.isAbove(dim.height, 0);
  wrapper.unmount();
});

test('#adapter.getAnchorDimensions returns width/height of menuSurfaceElement_', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface anchorElement={div}>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  assert.deepInclude(
    wrapper.instance().foundation.adapter_.getAnchorDimensions(),
    div.getBoundingClientRect()
  );
  wrapper.unmount();
  div.remove();
});

test('#adapter.getWindowDimensions returns width/height of menuSurfaceElement_', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const dim = wrapper
    .update()
    .instance()
    .foundation.adapter_.getWindowDimensions();
  assert.isAbove(dim.width, 0);
  assert.isAbove(dim.height, 0);
});

test('#adapter.getBodyDimensions returns width/height of body', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  const dim = wrapper
    .update()
    .instance()
    .foundation.adapter_.getBodyDimensions();
  assert.isAtLeast(dim.width, 0);
  assert.isAtLeast(dim.height, 0);
  wrapper.unmount();
  div.remove();
});

test('#adapter.getWindowScroll returns scroll of window', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const scroll = wrapper
    .update()
    .instance()
    .foundation.adapter_.getWindowScroll();
  assert.isAtLeast(scroll.x, 0);
  assert.isAtLeast(scroll.y, 0);
});

test('#adapter.setPosition sets left, right, top, bottom state variables', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.adapter_.setPosition({
    left: 20,
    bottom: 30,
    top: 40,
  });
  assert.equal(wrapper.state().styleLeft, 20);
  assert.equal(wrapper.state().styleBottom, 30);
  assert.equal(wrapper.state().styleTop, 40);
  assert.equal(wrapper.state().styleRight, null);
});

test('#adapter.setMaxHeight sets maxHeight state variables', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.adapter_.setMaxHeight(500);
  assert.equal(wrapper.state().maxHeight, 500);
});

test('#adapter.addClass adds to classList', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes from classList', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  wrapper.instance().foundation.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass returns true if classList has class', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  assert.isTrue(
    wrapper.instance().foundation.adapter_.hasClass('test-class-name')
  );
});

test('#adapter.notifyClose calls onClose', () => {
  const onClose = td.func() as () => void;
  const wrapper = shallow<MenuSurface>(<MenuSurface onClose={onClose} />);
  wrapper.instance().foundation.adapter_.notifyClose();
  td.verify(onClose(), {times: 1});
});

test('#adapter.notifyClose calls deregisterWindowClickListener', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().deregisterWindowClickListener = td.func() as () => void;
  wrapper.instance().foundation.adapter_.notifyClose();
  td.verify(wrapper.instance().deregisterWindowClickListener!(), {times: 1});
});

test('#adapter.hasAnchor calls returns false if there is no props.anchorElement', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  assert.isFalse(wrapper.instance().foundation.adapter_.hasAnchor());
});

test('#adapter.hasAnchor calls returns true if there is props.anchorElement', () => {
  const anchorElement = <div /> as unknown as HTMLDivElement;
  const wrapper = shallow<MenuSurface>(<MenuSurface anchorElement={anchorElement} />);
  assert.isTrue(wrapper.instance().foundation.adapter_.hasAnchor());
});

test('#adapter.isElementInContainer returns true if the element is the menuSurfaceElement_', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface />);
  const element = wrapper.getDOMNode();
  assert.isTrue(
    wrapper.instance().foundation.adapter_.isElementInContainer(element)
  );
  wrapper.unmount();
});

test('#adapter.isElementInContainer returns true if the element is within the container', () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  const element = wrapper.find('button').getDOMNode();
  assert.isTrue(
    wrapper.instance().foundation.adapter_.isElementInContainer(element)
  );
  wrapper.unmount();
});

test('#adapter.isRtl returns true is rtl', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  wrapper.getDOMNode().setAttribute('dir', 'rtl');
  assert.isTrue(wrapper.instance().foundation.adapter_.isRtl());
  wrapper.unmount();
  div.remove();
});

test('#adapter.setTransformOrigin sets maxHeight state variables', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation.adapter_.setTransformOrigin('translate()');
  assert.equal(wrapper.state().transformOrigin, 'translate()');
});

test('onKeyDown calls props.onKeyDown', () => {
  const onKeyDown = td.func() as (event: React.KeyboardEvent) => {};
  const wrapper = shallow<MenuSurface>(<MenuSurface onKeyDown={onKeyDown} />);
  const evt = {} as React.KeyboardEvent;
  wrapper.instance().handleKeydown(evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('onKeyDown calls foundation.handleKeydown', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface>hello</MenuSurface>);
  wrapper.instance().foundation.handleKeydown = td.func() as (event: React.KeyboardEvent) => {};
  const evt = {} as React.KeyboardEvent;
  wrapper.instance().handleKeydown(evt);
  td.verify(wrapper.instance().foundation.handleKeydown(evt), {times: 1});
});

test('component styles is applied from this.styles', () => {
  const wrapper = mount<MenuSurface>(<MenuSurface />);
  wrapper.setState({
    maxHeight: 200,
    styleLeft: 50,
  });
  assert.equal(wrapper.childAt(0).props().style!.maxHeight, 200);
  assert.equal(wrapper.childAt(0).props().style!.left, 50);
  wrapper.unmount();
});

test('#componentWillUnmount calls #deregisterWindowClickListener', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().deregisterWindowClickListener = td.func() as () => void;
  const deregisterWindowClickListener = wrapper.instance().deregisterWindowClickListener;
  wrapper.unmount();
  td.verify(deregisterWindowClickListener!(), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test('render should create a component in the document body', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(<MenuSurface />, options);
  assert.equal(wrapper.getDOMNode().parentElement, document.body);
  wrapper.unmount();
  div.remove();
});

test('unmount should remove the component from the document body', () => {
  const wrapper = mount(<MenuSurface />);
  assert.equal(document.querySelectorAll('body > .mdc-menu-surface').length, 1);
  wrapper.unmount();
  assert.equal(document.querySelectorAll('body > .mdc-menu-surface').length, 0);
});
