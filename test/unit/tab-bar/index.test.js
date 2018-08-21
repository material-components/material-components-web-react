import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabBar from '../../../packages/tab-bar/index';

suite('TabBar');

test('classNames adds classes', () => {
  const wrapper = shallow(<TabBar className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-bar'));
});

test('has a foundation after mount', () => {
  const wrapper = mount(<TabBar active='true' />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TabBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('key down event calls foundation.handleKeyDown', () => {
  const wrapper = shallow(<TabBar />);
  const foundation = wrapper.instance().foundation_;
  foundation.handleKeyDown = td.func();
  const evt = {};
  wrapper.simulate('keyDown', evt);
  td.verify(foundation.handleKeyDown(evt), {times: 1});
});

test('key down event calls props.onKeyDown', () => {
  const onKeyDown = td.func();
  const wrapper = shallow(<TabBar onKeyDown={onKeyDown} />);
  const evt = {};
  wrapper.simulate('keyDown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('click on tab calls foundation.activateTab', () => {
  const wrapper = shallow(
    <TabBar>
      <div className='tab'/>
    </TabBar>
  );
  const foundation = wrapper.instance().foundation_;
  foundation.activateTab = td.func();
  wrapper.find('.tab').simulate('click');
  td.verify(foundation.activateTab(0), {times: 1});
});

test('click on tab calls props.handleActiveIndexUpdate', () => {
  const handleActiveIndexUpdate = td.func();
  const wrapper = shallow(
    <TabBar handleActiveIndexUpdate={handleActiveIndexUpdate}>
      <div className='tab'/>
    </TabBar>
  );
  wrapper.find('.tab').simulate('click');
  td.verify(handleActiveIndexUpdate(0), {times: 1});
});

test('click on tab calls props.onClick', () => {
  const onClick = td.func();
  const wrapper = shallow(
    <TabBar onClick={onClick}>
      <div className='tab'/>
    </TabBar>
  );
  const evt = {};
  wrapper.find('.tab').simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('#adapter.getActiveTabIndex returns props.activeIndex', () => {
  const wrapper = shallow(<TabBar activeIndex={2}/>);
  assert.equal(wrapper.instance().adapter.getActiveTabIndex(), 2);
});

test('#adapter.scrollTo calls scrollTo on tab scroller', () => {
  const wrapper = mount(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.scrollTo = td.func();
  wrapper.instance().adapter.scrollTo(100);
  td.verify(scroller.scrollTo(100));
});

test('#adapter.incrementScroll calls incrementScroll on tab scroller', () => {
  const wrapper = mount(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.incrementScroll = td.func();
  wrapper.instance().adapter.incrementScroll(100);
  td.verify(scroller.incrementScroll(100));
});

test('#adapter.getScrollPosition calls getScrollPosition on tab scroller', () => {
  const wrapper = mount(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.getScrollPosition = td.func();
  wrapper.instance().adapter.getScrollPosition();
  td.verify(scroller.getScrollPosition());
});

test('#adapter.getScrollContentWidth calls getScrollContentWidth on tab scroller', () => {
  const wrapper = mount(<TabBar />);
  const scroller = wrapper.instance().tabScroller_.current;
  scroller.getScrollContentWidth = td.func();
  wrapper.instance().adapter.getScrollContentWidth();
  td.verify(scroller.getScrollContentWidth());
});

test('#adapter.getOffsetWidth returns tab bar element offsetWidth', () => {
  const wrapper = mount(<TabBar />);
  assert.equal(wrapper.instance().adapter.getOffsetWidth(), wrapper.instance().tabBarElement_.current.offsetWidth);
});

test('#adapter.isRTL returns true if props.isRTL is true', () => {
  const wrapper = shallow(<TabBar isRTL />);
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRTL());
});

test('#adapter.isRTL returns false is props.isRTL is false', () => {
  const wrapper = shallow(<TabBar />);
  assert.isFalse(wrapper.instance().foundation_.adapter_.isRTL());
});

test('#adapter.activateTabAtIndex calls activate on tab at index', () => {
  const clientRect = {test: 1};
  const tab0 = {};
  const tab1 = {activate: td.func()};
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.activateTabAtIndex(1, clientRect);
  td.verify(tab1.activate(clientRect));
});

test('#adapter.deactivateTabAtIndex calls deactivate on tab at index', () => {
  const tab0 = {};
  const tab1 = {deactivate: td.func()};
  const wrapper = shallow(<TabBar activeIndex={1} />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.deactivateTabAtIndex(1);
  td.verify(tab1.deactivate());
});

test('#adapter.focusTabAtIndex calls focus on tab at index', () => {
  const tab0 = {};
  const tab1 = {focus: td.func()};
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.focusTabAtIndex(1);
  td.verify(tab1.focus());
});

test('#adapter.getTabIndicatorClientRectAtIndex calls computeIndicatorClientRect on tab at index', () => {
  const tab0 = {};
  const tab1 = {computeIndicatorClientRect: td.func()};
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.getTabIndicatorClientRectAtIndex(1);
  td.verify(tab1.computeIndicatorClientRect());
});

test('#adapter.getTabDimensionsAtIndex calls computeDimensions on tab at index', () => {
  const tab0 = {};
  const tab1 = {computeDimensions: td.func()};
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  wrapper.instance().adapter.getTabDimensionsAtIndex(1);
  td.verify(tab1.computeDimensions());
});

test('#adapter.getIndexOfTab returns index of given tab', () => {
  const tab0 = {};
  const tab1 = {};
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [tab0, tab1];
  assert.equal(wrapper.instance().adapter.getIndexOfTab(tab1), 1);
});

test('#adapter.getTabListLength returns length of tab list', () => {
  const wrapper = shallow(<TabBar />);
  wrapper.instance().tabList_ = [{}, {}, {}];
  assert.equal(wrapper.instance().adapter.getTabListLength(), 3);
});
