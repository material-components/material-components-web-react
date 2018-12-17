import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabBar from '../../../packages/tab-bar/index';

suite('TabBar');

test('classNames adds classes', () => {
  const wrapper = shallow(<TabBar className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-bar'));
});

test('has a foundation after mount', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('initially sets state.previousActiveIndex to props.activeIndex', () => {
  const activeIndex = 4;
  const wrapper = shallow<TabBar>(<TabBar activeIndex={activeIndex} />);
  assert.equal(wrapper.state().previousActiveIndex, activeIndex);
});

test('key down event calls foundation.handleKeyDown', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.handleKeyDown = td.func();
  const evt = {
    persist: () => {},
  };
  wrapper.simulate('keyDown', evt);
  td.verify(foundation.handleKeyDown(evt), {times: 1});
});

test('key down event calls props.onKeyDown', () => {
  const onKeyDown = td.func() as React.KeyboardEventHandler<HTMLDivElement>;
  const wrapper = shallow<TabBar>(<TabBar onKeyDown={onKeyDown} />);
  const evt = {
    persist: () => {},
  } as React.KeyboardEvent<HTMLDivElement>;
  wrapper.simulate('keyDown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('click on tab calls props.onClick', () => {
  const onClick = td.func() as React.MouseEventHandler<HTMLDivElement>;
  const wrapper = shallow(
    <TabBar onClick={onClick}>
      <div className='tab' />
    </TabBar>
  );
  const evt = {} as React.MouseEvent<HTMLDivElement>;
  wrapper.find('.tab').simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('#adapter.getPreviousActiveTabIndex returns state.previousActiveIndex', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  assert.equal(
    wrapper.instance().adapter.getPreviousActiveTabIndex(),
    wrapper.state().previousActiveIndex
  );
});

test('#adapter.scrollTo calls scrollTo on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.scrollTo = td.func();
  wrapper.instance().adapter.scrollTo(100);
  td.verify(scroller.scrollTo(100));
});

test('#adapter.incrementScroll calls incrementScroll on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.incrementScroll = td.func();
  wrapper.instance().adapter.incrementScroll(100);
  td.verify(scroller.incrementScroll(100));
});

test('#adapter.getScrollPosition calls getScrollPosition on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.getScrollPosition = td.func();
  wrapper.instance().adapter.getScrollPosition();
  td.verify(scroller.getScrollPosition());
});

test('#adapter.getScrollContentWidth calls getScrollContentWidth on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.getScrollContentWidth = td.func();
  wrapper.instance().adapter.getScrollContentWidth();
  td.verify(scroller.getScrollContentWidth());
});

test('#adapter.getOffsetWidth returns tab bar element offsetWidth', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  assert.equal(
    wrapper.instance().adapter.getOffsetWidth(),
    wrapper.instance().tabBarElement_.current!.offsetWidth
  );
});

test('#adapter.isRTL returns true if props.isRtl is true', () => {
  const wrapper = shallow<TabBar>(<TabBar isRtl />);
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRTL());
});

test('#adapter.isRTL returns false is props.isRtl is false', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  assert.isFalse(wrapper.instance().foundation_.adapter_.isRTL());
});

test('#adapter.setActiveTab calls props.handleActiveIndexUpdate', () => {
  const handleActiveIndexUpdate = td.func() as (n: number) => void;
  const tab0 = {};
  const tab1 = {};
  const wrapper = shallow<TabBar>(
    <TabBar handleActiveIndexUpdate={handleActiveIndexUpdate} />
  );
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.setActiveTab(1);
  td.verify(handleActiveIndexUpdate(1));
});

test('#adapter.activateTabAtIndex calls activate on tab at index', () => {
  const clientRect = {test: 1} as unknown as ClientRect;
  const tab0 = {};
  const tab1 = {activate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.activateTabAtIndex(1, clientRect);
  td.verify(tab1.activate(clientRect));
});

test('#adapter.deactivateTabAtIndex calls deactivate on tab at index', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar activeIndex={1} />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.deactivateTabAtIndex(1);
  td.verify(tab1.deactivate());
});

test('#adapter.focusTabAtIndex calls focus on tab at index', () => {
  const tab0 = {};
  const tab1 = {focus: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.focusTabAtIndex(1);
  td.verify(tab1.focus());
});

test('#adapter.getTabIndicatorClientRectAtIndex calls computeIndicatorClientRect on tab at index', () => {
  const tab0 = {};
  const tab1 = {computeIndicatorClientRect: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.getTabIndicatorClientRectAtIndex(1);
  td.verify(tab1.computeIndicatorClientRect());
});

test('#adapter.getTabDimensionsAtIndex calls computeDimensions on tab at index', () => {
  const tab0 = {};
  const tab1 = {computeDimensions: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.getTabDimensionsAtIndex(1);
  td.verify(tab1.computeDimensions());
});

test('#adapter.getIndexOfTab returns index of given tab', () => {
  const tab0 = {};
  const tab1 = {};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  assert.equal(wrapper.instance().adapter.getIndexOfTab(tab1), 1);
});

test('#adapter.getTabListLength returns length of tab list', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList_ = [{}, {}, {}];
  assert.equal(wrapper.instance().adapter.getTabListLength(), 3);
});

test('props.activeIndex updates to different value when not initially set calls foundation.activateTab', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().foundation_.activateTab = td.func();
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.setProps({activeIndex: 1});
  td.verify(wrapper.instance().foundation_.activateTab(1), {times: 1});
});

test('props.indexInView updates to different value  when not initially set calls foundation.scrollIntoView', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().foundation_.scrollIntoView = td.func();
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.setProps({indexInView: 1});
  td.verify(wrapper.instance().foundation_.scrollIntoView(1), {times: 1});
});

test('props.activeIndex updates to different value with a set value calls foundation.activateTab', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar activeIndex={1} />);
  wrapper.instance().foundation_.activateTab = td.func();
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.setProps({activeIndex: 0});
  td.verify(wrapper.instance().foundation_.activateTab(0), {times: 1});
});

test('props.indexInView updates to different value with a set value calls foundation.scrollIntoView', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow<TabBar>(<TabBar indexInView={1} />);
  wrapper.instance().foundation_.scrollIntoView = td.func();
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.setProps({indexInView: 0});
  td.verify(wrapper.instance().foundation_.scrollIntoView(0), {times: 1});
});
