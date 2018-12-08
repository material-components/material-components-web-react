import * as React from "react";
import { assert } from "chai";
import * as td from "testdouble";
import { shallow, mount } from "enzyme";
// @ts-ignore
import MenuSurface, { Corner } from "../../../packages/menu-surface/index.tsx";

suite("MenuSurface");

const removeMenuFromBody = wrapper => {
  wrapper
    .find(".mdc-menu-surface")
    .getDOMNode()
    .remove();
};

test("classNames adds classes", () => {
  const wrapper = shallow(<MenuSurface className="test-class-name" />);
  assert.isTrue(wrapper.hasClass("test-class-name"));
  assert.isTrue(wrapper.hasClass("mdc-menu-surface"));
});

test("classList adds classes", () => {
  const wrapper = shallow(<MenuSurface />);
  wrapper.setState({ classList: new Set(["test-class-name"]) });
  assert.isTrue(wrapper.hasClass("test-class-name"));
});

test("props.fixed adds fixed class", () => {
  const wrapper = shallow(<MenuSurface fixed />);
  assert.isTrue(wrapper.hasClass("mdc-menu-surface--fixed"));
});

test("foundation is created", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  assert.exists(wrapper.instance().foundation_);
});

test("update to props.open will call foundation.open", () => {
  const wrapper = mount<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.open = td.func();
  wrapper.setProps({ open: true });
  td.verify(wrapper.instance().foundation_.open(), { times: 1 });
  removeMenuFromBody(wrapper);
});

test("update to props.open sets firstFocusableElement_", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>click</button>
    </MenuSurface>
  );
  wrapper.setProps({ open: true });
  assert.equal(
    (wrapper.instance().firstFocusableElement_ as HTMLElement),
    wrapper.find("button").getDOMNode()
  );
  removeMenuFromBody(wrapper);
});

test("update to props.open sets lastFocusableElement_", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>click</button>
    </MenuSurface>
  );
  wrapper.setProps({ open: true });
  assert.equal(
    (wrapper.instance().lastFocusableElement_ as HTMLElement),
    wrapper.find("button").getDOMNode()
  );
  removeMenuFromBody(wrapper);
});

test("update to props.open from true to false will call foundation.close", () => {
  const wrapper = mount<MenuSurface>(<MenuSurface open />);
  wrapper.instance().foundation_.close = td.func();
  wrapper.setProps({ open: false });
  td.verify(wrapper.instance().foundation_.close(), { times: 1 });
  removeMenuFromBody(wrapper);
});

test("foundation_.setAbsolutePosition is called when props.coordinates updates", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.setAbsolutePosition = td.func();
  wrapper.setProps({ coordinates: { x: 1, y: 11 } });
  td.verify(wrapper.instance().foundation_.setAbsolutePosition(1, 11), {
    times: 1
  });
});

test("foundation_.setAnchorCorner is called when props.anchorCorner updates", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.setAnchorCorner = td.func();
  wrapper.setProps({ anchorCorner: Corner.TOP_RIGHT });
  td.verify(wrapper.instance().foundation_.setAnchorCorner(Corner.TOP_RIGHT), {
    times: 1
  });
});

test("foundation_.setAnchorMargin is called when props.anchorMargin updates", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.setAnchorMargin = td.func();
  wrapper.setProps({ anchorMargin: { top: 20 } });
  td.verify(wrapper.instance().foundation_.setAnchorMargin({ top: 20 }), {
    times: 1
  });
});

test("foundation_.setQuickOpen is called when props.quickOpen updates to true", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.setQuickOpen = td.func();
  wrapper.setProps({ quickOpen: true });
  td.verify(wrapper.instance().foundation_.setQuickOpen(true), { times: 1 });
});

test("foundation_.setQuickOpen is called when props.quickOpen updates to false", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface quickOpen />);
  wrapper.instance().foundation_.setQuickOpen = td.func();
  wrapper.setProps({ quickOpen: false });
  td.verify(wrapper.instance().foundation_.setQuickOpen(false), { times: 1 });
});

test("#registerWindowClickListener_ adds click event handler to window", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.handleBodyClick = td.func();
  wrapper.instance().registerWindowClickListener_();
  const clickEvent = new Event("click");
  window.dispatchEvent(clickEvent);
  td.verify(wrapper.instance().foundation_.handleBodyClick(clickEvent), {
    times: 1
  });
});

test("#deregisterWindowClickListener_ removes click event handler to window", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.handleBodyClick = td.func();
  wrapper.instance().registerWindowClickListener_();
  wrapper.instance().deregisterWindowClickListener_();
  const clickEvent = new Event("click");
  window.dispatchEvent(clickEvent);
  td.verify(wrapper.instance().foundation_.handleBodyClick(clickEvent), {
    times: 0
  });
});

test("#adapter.notifyOpen calls #registerWindowClickListener_", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().registerWindowClickListener_ = td.func() as () => void;
  wrapper.instance().foundation_.adapter_.notifyOpen();
  td.verify(wrapper.instance().registerWindowClickListener_(), { times: 1 });
});

test("#adapter.notifyOpen calls onOpen", () => {
  const onOpen = td.func() as () => void;
  const wrapper = shallow<MenuSurface>(<MenuSurface onOpen={onOpen} />);
  wrapper.instance().foundation_.adapter_.notifyOpen();
  td.verify(onOpen(), { times: 1 });
});

test("#adapter.isFocused returns true if menuSurfaceElement_ is the activeElement", () => {
  const div = document.createElement("div");
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface tabIndex={-1}>
      <span>hello</span>
    </MenuSurface>,
    options
  );
  (wrapper.getDOMNode() as HTMLDivElement).focus();
  assert.isTrue(wrapper.instance().foundation_.adapter_.isFocused());
  removeMenuFromBody(wrapper);
  div.remove();
});

test("#adapter.isFocused returns false if menuSurfaceElement_ is not the activeElement", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <span>hello</span>
    </MenuSurface>
  );
  assert.isFalse(wrapper.instance().foundation_.adapter_.isFocused());
  removeMenuFromBody(wrapper);
});

test("#adapter.saveFocus saves the currently focused element", () => {
  const div = document.createElement("div");
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  (wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement)
    .focus();
  wrapper.instance().foundation_.adapter_.saveFocus();
  assert.equal(
    wrapper.instance().previousFocus_,
    (wrapper.find("button").getDOMNode() as HTMLButtonElement)
  );
  removeMenuFromBody(wrapper);
  div.remove();
});

test("#adapter.restoreFocus restores focus to an element within the menuSurfaceElement_", () => {
  const div = document.createElement("div");
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
      <a href="#">link</a>
    </MenuSurface>,
    options
  );
  wrapper.instance().previousFocus_ = wrapper.find("a").getDOMNode() as HTMLAnchorElement;
  (wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement)
    .focus();
  wrapper.instance().foundation_.adapter_.restoreFocus();
  assert.equal(document.activeElement, wrapper.find("a").getDOMNode());
  removeMenuFromBody(wrapper);
  div.remove();
});

test("#adapter.isFirstElementFocused returns true if firstFocusableElement_ is the activeElement", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().firstFocusableElement_ = wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement;
  (wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement)
    .focus();
  assert.isTrue(
    wrapper.instance().foundation_.adapter_.isFirstElementFocused()
  );
  removeMenuFromBody(wrapper);
});

test("#adapter.isLastElementFocused returns true if lastFocusableElement_ is the activeElement", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().lastFocusableElement_ = wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement;
  (wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement)
    .focus();
  assert.isTrue(wrapper.instance().foundation_.adapter_.isLastElementFocused());
  removeMenuFromBody(wrapper);
});

test("#adapter.focusFirstElement focuses on firstFocusableElement_", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().firstFocusableElement_ = wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement;
  wrapper.instance().foundation_.adapter_.focusFirstElement();
  assert.equal(document.activeElement, wrapper.find("button").getDOMNode());
  removeMenuFromBody(wrapper);
});

test("#adapter.focusLastElement focuses on lastFocusableElement_", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  wrapper.instance().lastFocusableElement_ = wrapper
    .find("button")
    .getDOMNode() as HTMLButtonElement;
  wrapper.instance().foundation_.adapter_.focusLastElement();
  assert.equal(document.activeElement, wrapper.find("button").getDOMNode());
  removeMenuFromBody(wrapper);
});

test("#adapter.getInnerDimensions returns width/height of menuSurfaceElement_", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  const dim = wrapper.instance().foundation_.adapter_.getInnerDimensions();
  assert.isAbove(dim.width, 0);
  assert.isAbove(dim.height, 0);
  removeMenuFromBody(wrapper);
});

test("#adapter.getAnchorDimensions returns width/height of menuSurfaceElement_", () => {
  const div = document.createElement("div");
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface anchorElement={div}>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  assert.deepInclude(
    wrapper.instance().foundation_.adapter_.getAnchorDimensions(),
    div.getBoundingClientRect()
  );
  removeMenuFromBody(wrapper);
  div.remove();
});

test("#adapter.getWindowDimensions returns width/height of menuSurfaceElement_", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const dim = wrapper
    .update()
    .instance()
    .foundation_.adapter_.getWindowDimensions();
  assert.isAbove(dim.width, 0);
  assert.isAbove(dim.height, 0);
});

test("#adapter.getBodyDimensions returns width/height of body", () => {
  const div = document.createElement("div");
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  const dim = wrapper
    .update()
    .instance()
    .foundation_.adapter_.getBodyDimensions();
  assert.isAtLeast(dim.width, 0);
  assert.isAtLeast(dim.height, 0);
});

test("#adapter.getWindowScroll returns scroll of window", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const scroll = wrapper
    .update()
    .instance()
    .foundation_.adapter_.getWindowScroll();
  assert.isAtLeast(scroll.x, 0);
  assert.isAtLeast(scroll.y, 0);
});

test("#adapter.setPosition sets left, right, top, bottom state variables", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.adapter_.setPosition({
    left: 20,
    bottom: 30,
    top: 40
  });
  assert.equal(wrapper.state().styleLeft, 20);
  assert.equal(wrapper.state().styleBottom, 30);
  assert.equal(wrapper.state().styleTop, 40);
  assert.equal(wrapper.state().styleRight, null);
});

test("#adapter.setMaxHeight sets maxHeight state variables", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.adapter_.setMaxHeight(500);
  assert.equal(wrapper.state().maxHeight, 500);
});

test("#adapter.addClass adds to classList", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.adapter_.addClass("test-class-name");
  assert.isTrue(wrapper.state().classList.has("test-class-name"));
});

test("#adapter.removeClass removes from classList", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.setState({ classList: new Set(["test-class-name"]) });
  wrapper.instance().foundation_.adapter_.removeClass("test-class-name");
  assert.isFalse(wrapper.state().classList.has("test-class-name"));
});

test("#adapter.hasClass returns true if classList has class", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.setState({ classList: new Set(["test-class-name"]) });
  assert.isTrue(
    wrapper.instance().foundation_.adapter_.hasClass("test-class-name")
  );
});

test("#adapter.notifyClose calls onClose", () => {
  const onClose = td.func() as () => void;
  const wrapper = shallow<MenuSurface>(<MenuSurface onClose={onClose} />);
  wrapper.instance().foundation_.adapter_.notifyClose();
  td.verify(onClose(), { times: 1 });
});

test("#adapter.notifyClose calls deregisterWindowClickListener", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().deregisterWindowClickListener_ = td.func() as () => void;
  wrapper.instance().foundation_.adapter_.notifyClose();
  td.verify(wrapper.instance().deregisterWindowClickListener_(), { times: 1 });
});

test("#adapter.hasAnchor calls returns false if there is no props.anchorElement", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  assert.isFalse(wrapper.instance().foundation_.adapter_.hasAnchor());
});

test("#adapter.hasAnchor calls returns true if there is props.anchorElement", () => {
  const anchorElement = <div />;
  const wrapper = shallow<MenuSurface>(<MenuSurface anchorElement={anchorElement} />);
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasAnchor());
});

test("#adapter.isElementInContainer returns true if the element is the menuSurfaceElement_", () => {
  const wrapper = mount<MenuSurface>(<MenuSurface />);
  const element = wrapper.getDOMNode();
  assert.isTrue(
    wrapper.instance().foundation_.adapter_.isElementInContainer(element)
  );
  removeMenuFromBody(wrapper);
});

test("#adapter.isElementInContainer returns true if the element is within the container", () => {
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>
  );
  const element = wrapper.find("button").getDOMNode();
  assert.isTrue(
    wrapper.instance().foundation_.adapter_.isElementInContainer(element)
  );
  removeMenuFromBody(wrapper);
});

test("#adapter.isRtl returns true is rtl", () => {
  const div = document.createElement("div");
  document.body.append(div);
  const options = { attachTo: div };
  const wrapper = mount<MenuSurface>(
    <MenuSurface>
      <button>hello</button>
    </MenuSurface>,
    options
  );
  wrapper.getDOMNode().setAttribute("dir", "rtl");
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRtl());
  removeMenuFromBody(wrapper);
  div.remove();
});

test("#adapter.setTransformOrigin sets maxHeight state variables", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().foundation_.adapter_.setTransformOrigin("translate()");
  assert.equal(wrapper.state().transformOrigin, "translate()");
});

test("onKeyDown calls props.onKeyDown", () => {
  const onKeyDown = td.func() as (event: React.KeyboardEvent) => {};
  const wrapper = shallow<MenuSurface>(<MenuSurface onKeyDown={onKeyDown} />);
  const evt = {} as React.KeyboardEvent;
  wrapper.instance().handleKeydown(evt);
  td.verify(onKeyDown(evt), { times: 1 });
});

test("onKeyDown calls foundation.handleKeydown", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface>hello</MenuSurface>);
  wrapper.instance().foundation_.handleKeydown = td.func() as (event: React.KeyboardEvent) => {};
  const evt = {} as React.KeyboardEvent;
  wrapper.instance().handleKeydown(evt);
  td.verify(wrapper.instance().foundation_.handleKeydown(evt), { times: 1 });
});

test("component styles is applied from this.styles", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.setState({
    maxHeight: 200,
    styleLeft: 50
  });
  assert.equal(wrapper.props().style!.maxHeight, 200);
  assert.equal(wrapper.props().style!.left, 50);
});

test("#componentWillUnmount calls #deregisterWindowClickListener", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  wrapper.instance().deregisterWindowClickListener_ = td.func() as () => void;
  const deregisterWindowClickListener = wrapper.instance()
    .deregisterWindowClickListener_;
  wrapper.unmount();
  td.verify(deregisterWindowClickListener(), { times: 1 });
});

test("#componentWillUnmount destroys foundation", () => {
  const wrapper = shallow<MenuSurface>(<MenuSurface />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
