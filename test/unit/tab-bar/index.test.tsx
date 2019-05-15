import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabBar from '../../../packages/tab-bar/index';
import Tab from '../../../packages/tab/index';
import {MDCTabBarAdapter} from '@material/tab-bar/adapter';
import {coerceForTesting} from '../helpers/types';

suite('TabBar');

const getAdapter = (instance: TabBar): MDCTabBarAdapter => {
  // @ts-ignore adapter_ is a private property, we need to override this for testing
  return instance.foundation.adapter_;
};

test('classNames adds classes', () => {
  const wrapper = shallow(<TabBar className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-bar'));
});

test('has a foundation after mount', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  assert.exists(wrapper.instance().foundation);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
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
  const foundation = wrapper.instance().foundation;
  foundation.handleKeyDown = td.func<(evt: KeyboardEvent) => void>();
  const evt = coerceForTesting<React.KeyboardEvent>({
    persist: () => {},
    nativeEvent: {},
  });
  wrapper.simulate('keyDown', evt);
  td.verify(foundation.handleKeyDown(evt.nativeEvent), {times: 1});
});

test('key down event calls props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<
    React.KeyboardEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow<TabBar>(<TabBar onKeyDown={onKeyDown} />);
  const evt = coerceForTesting<React.KeyboardEvent<HTMLDivElement>>({
    persist: () => {},
    nativeEvent: {},
  });
  wrapper.simulate('keyDown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('click on tab calls tab.props.onClick', () => {
  const onClick = coerceForTesting<React.MouseEventHandler<HTMLButtonElement>>(
    td.func()
  );
  const wrapper = shallow(
    <TabBar>
      <Tab className='tab' onClick={onClick} />
    </TabBar>
  );
  const evt = coerceForTesting<React.MouseEvent<HTMLButtonElement>>({});
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
  const scroller = wrapper.instance().tabScrollerRef.current;
  scroller!.scrollTo = coerceForTesting<() => void>(td.func());
  wrapper.instance().adapter.scrollTo(100);
  td.verify(scroller!.scrollTo(100));
});

test('#adapter.incrementScroll calls incrementScroll on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScrollerRef.current;
  scroller!.incrementScroll = coerceForTesting<() => void>(td.func());
  wrapper.instance().adapter.incrementScroll(100);
  td.verify(scroller!.incrementScroll(100));
});

test('#adapter.getScrollPosition calls getScrollPosition on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScrollerRef.current;
  scroller!.getScrollPosition = coerceForTesting<() => number>(td.func());
  wrapper.instance().adapter.getScrollPosition();
  td.verify(scroller!.getScrollPosition());
});

test('#adapter.getScrollContentWidth calls getScrollContentWidth on tab scroller', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  const scroller = wrapper.instance().tabScrollerRef.current;
  scroller!.getScrollContentWidth = coerceForTesting<() => number>(td.func());
  wrapper.instance().adapter.getScrollContentWidth();
  td.verify(scroller!.getScrollContentWidth());
});

test('#adapter.getOffsetWidth returns tab bar element offsetWidth', () => {
  const wrapper = mount<TabBar>(<TabBar />);
  assert.equal(
    wrapper.instance().adapter.getOffsetWidth(),
    wrapper.instance().tabBarRef.current!.offsetWidth
  );
});

test('#adapter.isRTL returns true if props.isRtl is true', () => {
  const wrapper = shallow<TabBar>(<TabBar isRtl />);
  assert.isTrue(getAdapter(wrapper.instance()).isRTL());
});

test('#adapter.isRTL returns false is props.isRtl is false', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  assert.isFalse(getAdapter(wrapper.instance()).isRTL());
});

test('#adapter.setActiveTab calls props.handleActiveIndexUpdate', () => {
  const handleActiveIndexUpdate = coerceForTesting<(n: number) => void>(
    td.func()
  );
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({});
  const wrapper = shallow<TabBar>(
    <TabBar handleActiveIndexUpdate={handleActiveIndexUpdate} />
  );
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.setActiveTab(1);
  td.verify(handleActiveIndexUpdate(1));
});

test('#adapter.activateTabAtIndex calls activate on tab at index', () => {
  const clientRect = coerceForTesting<ClientRect>({test: 1});
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({activate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.activateTabAtIndex(1, clientRect);
  td.verify(tab1.activate(clientRect));
});

test('#adapter.deactivateTabAtIndex calls deactivate on tab at index', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({deactivate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar activeIndex={1} />);
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.deactivateTabAtIndex(1);
  td.verify(tab1.deactivate());
});

test('#adapter.focusTabAtIndex calls focus on tab at index', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({focus: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.focusTabAtIndex(1);
  td.verify(tab1.focus());
});

test('#adapter.getTabIndicatorClientRectAtIndex calls computeIndicatorClientRect on tab at index', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({computeIndicatorClientRect: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.getTabIndicatorClientRectAtIndex(1);
  td.verify(tab1.computeIndicatorClientRect());
});

test('#adapter.getTabDimensionsAtIndex calls computeDimensions on tab at index', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({computeDimensions: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.instance().adapter.getTabDimensionsAtIndex(1);
  td.verify(tab1.computeDimensions());
});

test('#adapter.getIndexOfTab returns index of given tab', () => {
  const tab0 = coerceForTesting<Tab>({
    props: {
      id: 'tab0',
    },
  });
  const tab1 = coerceForTesting<Tab>({
    props: {
      id: 'tab1',
    },
  });
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [tab0, tab1];
  assert.equal(wrapper.instance().adapter.getIndexOfTabById('tab1'), 1);
});

test('#adapter.getTabListLength returns length of tab list', () => {
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().tabList = [
    coerceForTesting<Tab>({}),
    coerceForTesting<Tab>({}),
    coerceForTesting<Tab>({}),
  ];
  assert.equal(wrapper.instance().adapter.getTabListLength(), 3);
});

test('props.activeIndex updates to different value when not initially set calls foundation.activateTab', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({deactivate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().foundation.activateTab = td.func<
    (index: number) => void
  >();
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.setProps({activeIndex: 1});
  td.verify(wrapper.instance().foundation.activateTab(1), {times: 1});
});

test('props.indexInView updates to different value  when not initially set calls foundation.scrollIntoView', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({deactivate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar />);
  wrapper.instance().foundation.scrollIntoView = td.func<
    (index: number) => void
  >();
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.setProps({indexInView: 1});
  td.verify(wrapper.instance().foundation.scrollIntoView(1), {times: 1});
});

test('props.activeIndex updates to different value with a set value calls foundation.activateTab', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({deactivate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar activeIndex={1} />);
  wrapper.instance().foundation.activateTab = td.func<
    (index: number) => void
  >();
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.setProps({activeIndex: 0});
  td.verify(wrapper.instance().foundation.activateTab(0), {times: 1});
});

test('props.indexInView updates to different value with a set value calls foundation.scrollIntoView', () => {
  const tab0 = coerceForTesting<Tab>({});
  const tab1 = coerceForTesting<Tab>({deactivate: td.func()});
  const wrapper = shallow<TabBar>(<TabBar indexInView={1} />);
  wrapper.instance().foundation.scrollIntoView = td.func<
    (index: number) => void
  >();
  wrapper.instance().tabList = [tab0, tab1];
  wrapper.setProps({indexInView: 0});
  td.verify(wrapper.instance().foundation.scrollIntoView(0), {times: 1});
});
