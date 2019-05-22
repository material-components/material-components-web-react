import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabScroller from '../../../packages/tab-scroller/index';
import {coerceForTesting} from '../helpers/types';
const CONTENT_SELECTOR = '.mdc-tab-scroller__scroll-content';
const AREA_SELECTOR = '.mdc-tab-scroller__scroll-area';
const clientRectShape = [
  'x',
  'y',
  'width',
  'height',
  'top',
  'left',
  'bottom',
  'right',
];

suite('TabScroller');

function getAdapter(instance: TabScroller) {
  // @ts-ignore adapter_ property is protected and we need to override this
  return instance.foundation.adapter_;
}

test('classNames adds classes', () => {
  const wrapper = shallow(<TabScroller className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-scroller'));
});

test('adds the alignStart class if props.alignStart is true', () => {
  const wrapper = shallow(<TabScroller alignStart />);
  assert.isTrue(wrapper.hasClass('mdc-tab-scroller--align-start'));
});

test('adds the alignEnd class if props.alignEnd is true', () => {
  const wrapper = shallow(<TabScroller alignEnd />);
  assert.isTrue(wrapper.hasClass('mdc-tab-scroller--align-end'));
});

test('adds the alignCenter class if props.alignCenter is true', () => {
  const wrapper = shallow(<TabScroller alignCenter />);
  assert.isTrue(wrapper.hasClass('mdc-tab-scroller--align-center'));
});

test('adds the classList classes to className', () => {
  const wrapper = shallow(<TabScroller />);
  const classList = new Set(['test-class-name']);
  wrapper.setState({classList});
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('#setStyleToElement adds a dashed style property to scrollAreaStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper
    .instance()
    .setStyleToElement('background-color', 'blue', 'scrollAreaStyleProperty');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollAreaStyleProperty
    ).backgroundColor,
    'blue'
  );
});

test('#setStyleToElement adds single word style property to scrollAreaStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper
    .instance()
    .setStyleToElement('margin', '24px', 'scrollAreaStyleProperty');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollAreaStyleProperty
    ).margin,
    '24px'
  );
});

test('#setStyleToElement adds a dashed style property to scrollContentStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper
    .instance()
    .setStyleToElement(
      'background-color',
      'blue',
      'scrollContentStyleProperty'
    );
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).backgroundColor,
    'blue'
  );
});

test('#setStyleToElement adds single word style property to scrollContentStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper
    .instance()
    .setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).margin,
    '24px'
  );
});

test('#setStyleToElement overrides a previous dashed style property to scrollContentStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.setState({
    scrollContentStyleProperty: {
      backgroundColor: 'orange',
    },
  });
  wrapper
    .instance()
    .setStyleToElement(
      'background-color',
      'blue',
      'scrollContentStyleProperty'
    );
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).backgroundColor,
    'blue'
  );
});

test('#setStyleToElement overrides a single word style property to scrollContentStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.setState({
    scrollContentStyleProperty: {
      margin: '50px',
    },
  });
  wrapper
    .instance()
    .setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).margin,
    '24px'
  );
});

test('#setStyleToElement does not override a different style property on scrollContentStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.setState({
    scrollContentStyleProperty: {
      backgroundColor: 'orange',
    },
  });
  wrapper
    .instance()
    .setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).margin,
    '24px'
  );
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).backgroundColor,
    'orange'
  );
});

test('#adapter.eventTargetMatchesSelector matches a selector passed as argument', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  const target = document.createElement('div');
  target.classList.add('test-class');
  const eventTargetMatchesSelector = wrapper
    .instance()
    .adapter.eventTargetMatchesSelector(target, '.test-class');
  assert.isTrue(eventTargetMatchesSelector);
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass adds to state.classList', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.addScrollAreaClass adds to state.areaClassList', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().adapter.addScrollAreaClass('test-class');
  assert.isTrue(wrapper.state().areaClassList.has('test-class'));
});

test('#adapter.setScrollAreaStyleProperty adds to state.scrollAreaStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().adapter.setScrollAreaStyleProperty('margin', '24px');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollAreaStyleProperty
    ).margin,
    '24px'
  );
});

test('#adapter.setScrollContentStyleProperty adds to state.scrollAreaStyleProperty', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().adapter.setScrollContentStyleProperty('margin', '24px');
  assert.equal(
    coerceForTesting<React.CSSProperties>(
      wrapper.state().scrollContentStyleProperty
    ).margin,
    '24px'
  );
});

test('#adapter.getScrollContentStyleValue adds to state.scrollAreaStyleProperty', () => {
  const wrapper = mount<TabScroller>(<TabScroller />);
  const node = wrapper.getDOMNode();
  document.body.append(node);
  wrapper
    .instance()
    .contentElement.current!.style.setProperty('color', 'lightblue');
  const content = document.querySelector('.mdc-tab-scroller__scroll-content');
  const contentStyleValue = getAdapter(
    wrapper.instance()
  ).getScrollContentStyleValue('color');
  assert.equal(
    contentStyleValue,
    window.getComputedStyle(content!).getPropertyValue('color')
  );
  node.remove();
});
const setupScrolling = () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to scroll
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount<TabScroller>(
    <TabScroller>
      <div style={{minWidth: '100vw'}}>TAB</div>
      <div style={{minWidth: '100vw'}}>TAB</div>
    </TabScroller>,
    options
  );
  // add scroll styles to allow for scroll to occur
  const areaElement = div.querySelector(AREA_SELECTOR) as HTMLDivElement;
  const contentElement = div.querySelector(CONTENT_SELECTOR) as HTMLDivElement;
  contentElement!.style.setProperty('display', 'flex');
  areaElement!.style.setProperty('overflow', 'scroll');
  return {div, wrapper};
};

test('#adapter.setScrollAreaScrollLeft adds to state.scrollAreaStyleProperty', () => {
  const {div, wrapper} = setupScrolling();
  getAdapter(wrapper.instance()).setScrollAreaScrollLeft(101);
  assert.equal(wrapper.instance().areaElement.current!.scrollLeft, 101);
  div.remove();
});

test('#adapter.getScrollAreaScrollLeft returns the areaElement scrollLeft property', () => {
  const {div, wrapper} = setupScrolling();
  const areaElement = div.querySelector(AREA_SELECTOR);
  areaElement!.scrollLeft = 20;
  assert.equal(getAdapter(wrapper.instance()).getScrollAreaScrollLeft(), 20);
  div.remove();
});

test('#adapter.getScrollContentOffsetWidth returns the contentElement offsetWidth property', () => {
  const {div, wrapper} = setupScrolling();
  assert.isAbove(
    getAdapter(wrapper.instance()).getScrollContentOffsetWidth(),
    0
  );
  div.remove();
});

test('#adapter.getScrollAreaOffsetWidth returns the areaElement offsetWidth property', () => {
  const {div, wrapper} = setupScrolling();
  assert.isAbove(getAdapter(wrapper.instance()).getScrollAreaOffsetWidth(), 0);
  div.remove();
});

test('#adapter.computeScrollAreaClientRect returns the areaElement clientRect', () => {
  const wrapper = mount<TabScroller>(<TabScroller />);
  const clientRect = getAdapter(
    wrapper.instance()
  ).computeScrollAreaClientRect();
  const jsonClientRect = JSON.parse(JSON.stringify(clientRect));
  assert.containsAllKeys(jsonClientRect, clientRectShape);
});

test('#adapter.computeScrollContentClientRect returns the contentElement clientRect', () => {
  const wrapper = mount<TabScroller>(<TabScroller />);
  const clientRect = getAdapter(
    wrapper.instance()
  ).computeScrollContentClientRect();
  const jsonClientRect = JSON.parse(JSON.stringify(clientRect));
  assert.containsAllKeys(jsonClientRect, clientRectShape);
});

test('#getScrollPosition calls foundation.getScrollPosition', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.getScrollPosition = td.func<() => number>();
  wrapper.instance().getScrollPosition();
  td.verify(wrapper.instance().foundation.getScrollPosition(), {times: 1});
});

test('#getScrollContentWidth returns the contentElement offsetWidth', () => {
  const {div, wrapper} = setupScrolling();
  const scrollPosition = wrapper.instance().getScrollContentWidth();
  assert.isAbove(scrollPosition!, 0);
  div.remove();
});

test('#incrementScroll calls foundation.incrementScroll', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.incrementScroll = td.func<
    (scrollXIncrement: number) => null
  >();
  wrapper.instance().incrementScroll(50);
  td.verify(wrapper.instance().foundation.incrementScroll(50), {times: 1});
});

test('#scrollTo calls foundation.scrollTo', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.scrollTo = td.func<(scrollX: number) => null>();
  wrapper.instance().scrollTo(50);
  td.verify(wrapper.instance().foundation.scrollTo(50), {times: 1});
});

test('areaElement gets areaClassList', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.setState({areaClassList: new Set(['test-class'])});
  wrapper.childAt(0).hasClass('test-class');
  wrapper.childAt(0).hasClass('mdc-tab-scroller__scroll-area');
});

test('wheel event triggers foundation.handleInteraction', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleInteraction = td.func<() => void>();
  const evt = {};
  wrapper.simulate('wheel', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(), {
    times: 1,
  });
});

test('wheel event triggers props.onWheel', () => {
  const onWheel = coerceForTesting<React.WheelEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow<TabScroller>(<TabScroller onWheel={onWheel} />);
  const evt = coerceForTesting<React.WheelEvent<HTMLDivElement>>({});
  wrapper.simulate('wheel', evt);
  td.verify(onWheel(evt), {times: 1});
});

test('touchstart event triggers foundation.handleInteraction', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleInteraction = td.func<() => void>();
  const evt = {};
  wrapper.simulate('touchstart', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(), {
    times: 1,
  });
});

test('touchstart event triggers props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<
    React.TouchEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<TabScroller onTouchStart={onTouchStart} />);
  const evt = coerceForTesting<React.TouchEvent<HTMLDivElement>>({});
  wrapper.simulate('touchstart', evt);
  td.verify(onTouchStart(evt), {times: 1});
});

test('pointerdown event triggers foundation.handleInteraction', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleInteraction = td.func<() => void>();
  const evt = coerceForTesting<React.TouchEvent<HTMLDivElement>>({});
  wrapper.simulate('pointerDown', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(), {
    times: 1,
  });
});

test('pointerdown event triggers props.onPointerDown', () => {
  const onPointerDown = coerceForTesting<
    React.PointerEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<TabScroller onPointerDown={onPointerDown} />);
  const evt = coerceForTesting<React.PointerEvent<HTMLDivElement>>({});
  wrapper.simulate('pointerDown', evt);
  td.verify(onPointerDown(evt), {times: 1});
});

test('mousedown event triggers foundation.handleInteraction', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleInteraction = td.func<() => null>();
  const evt = {};
  wrapper.simulate('mousedown', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(), {
    times: 1,
  });
});

test('mousedown event triggers props.onMouseDown', () => {
  const onMouseDown = coerceForTesting<React.MouseEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow(<TabScroller onMouseDown={onMouseDown} />);
  const evt = coerceForTesting<React.PointerEvent<HTMLDivElement>>({});
  wrapper.simulate('mousedown', evt);
  td.verify(onMouseDown(evt), {times: 1});
});

test('keydown event triggers foundation.handleInteraction', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleInteraction = td.func<() => void>();
  const evt = {};
  wrapper.simulate('keydown', evt);
  td.verify(wrapper.instance().foundation.handleInteraction(), {
    times: 1,
  });
});

test('keydown event triggers props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<
    React.KeyboardEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<TabScroller onKeyDown={onKeyDown} />);
  const evt = coerceForTesting<React.KeyboardEvent<HTMLDivElement>>({});
  wrapper.simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('transitionend event triggers foundation.handleTransitionEnd', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  wrapper.instance().foundation.handleTransitionEnd = td.func<
    (evt: Event) => null
  >();
  const evt = coerceForTesting<React.TransitionEvent>({
    nativeEvent: {},
  });
  wrapper.simulate('transitionend', evt);
  td.verify(
    wrapper.instance().foundation.handleTransitionEnd(evt.nativeEvent),
    {
      times: 1,
    }
  );
});

test('transitionend event triggers props.onTransitionEnd', () => {
  const onTransitionEnd = coerceForTesting<
    React.TransitionEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<TabScroller onTransitionEnd={onTransitionEnd} />);
  const evt = coerceForTesting<React.TransitionEvent<HTMLDivElement>>({
    nativeEvent: {},
  });
  wrapper.simulate('transitionend', evt);
  td.verify(onTransitionEnd(evt), {times: 1});
});

test('renders child components', () => {
  const wrapper = shallow(
    <TabScroller>
      <div className='test-tab'>Tab1</div>
      <div className='test-tab'>Tab2</div>
    </TabScroller>
  );
  const content = wrapper.childAt(0).childAt(0);
  assert.equal(content.children().length, 2);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<TabScroller>(<TabScroller />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
