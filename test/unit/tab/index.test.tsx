import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import Tab from '../../../packages/tab/index';
import TabIndicatorRef from '../../../packages/tab-indicator/index';
import {MDCTabDimensions} from '@material/tab/types';
import {coerceForTesting} from '../helpers/types';

suite('Tab');

test('classNames adds classes', () => {
  const wrapper = shallow(<Tab className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab'));
});

test('adds the minWidth class if props.minWidth is true', () => {
  const wrapper = shallow(<Tab minWidth />);
  assert.isTrue(wrapper.hasClass('mdc-tab--min-width'));
});

test('adds the stacked class if props.stacked is true', () => {
  const wrapper = shallow(<Tab stacked />);
  assert.isTrue(wrapper.hasClass('mdc-tab--stacked'));
});

test('renders as anchor if props.tag is a and href is set', () => {
  const wrapper = mount(<Tab tag='a' href='/foobar' />);
  const node = wrapper.getDOMNode();
  assert.equal(node.tagName.toLowerCase(), 'a');
  assert.equal(node.getAttribute('href'), '/foobar');
});

test('adds the active class if props.active is true on mount', () => {
  const wrapper = shallow(<Tab active />);
  assert.isTrue(wrapper.hasClass('mdc-tab--active'));
});

test('sets the tabIndex to 0 if props.active is true on mount', () => {
  const wrapper = shallow(<Tab active />);
  assert.equal(wrapper.prop('tabIndex'), 0);
});

test('sets the tabIndex to -1 if props.active is false on mount', () => {
  const wrapper = shallow(<Tab active={false} />);
  assert.equal(wrapper.prop('tabIndex'), -1);
});

test('adds a class from state.classList', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('has a foundation after mount', () => {
  const wrapper = mount<Tab>(<Tab active />);
  assert.exists(wrapper.instance().foundation);
});

test('if props.active updates to true, activate is called with previousIndicatorClientRect prop', () => {
  const clientRect = ({test: 1} as unknown) as ClientRect;
  const wrapper = shallow<Tab>(
    <Tab previousIndicatorClientRect={clientRect} />
  );
  wrapper.instance().activate = td.func() as (c?: ClientRect) => void;
  wrapper.setProps({active: true});
  td.verify(wrapper.instance().activate(clientRect), {times: 1});
});

test('if props.active updates to false, foundation.deactivate is called', () => {
  const wrapper = shallow<Tab>(<Tab active />);
  wrapper.instance().deactivate = td.func() as () => void;
  wrapper.setProps({active: false});
  td.verify(wrapper.instance().deactivate(), {times: 1});
});

test('calls foundation.setFocusOnActivate when props.focusOnActivate changes from false to true', () => {
  const wrapper = shallow<Tab>(<Tab focusOnActivate={false} />);
  wrapper.instance().foundation.setFocusOnActivate = td.func<
    (focusOnActivate: boolean) => null
  >();
  wrapper.setProps({focusOnActivate: true});
  td.verify(wrapper.instance().foundation.setFocusOnActivate(true), {times: 1});
});

test('calls foundation.setFocusOnActivate when props.focusOnActivate changes from true to false', () => {
  const wrapper = shallow<Tab>(<Tab focusOnActivate />);
  wrapper.instance().foundation.setFocusOnActivate = td.func<
    (focusOnActivate: boolean) => null
  >();
  wrapper.setProps({focusOnActivate: false});
  td.verify(wrapper.instance().foundation.setFocusOnActivate(false), {
    times: 1,
  });
});

test('when props.focusOnActivate is true, an active tab should be focused on mount', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const wrapper = mount<Tab>(<Tab active focusOnActivate />, {attachTo: div});
  assert.equal(document.activeElement, wrapper.getDOMNode());
  div.remove();
});

test('when props.focusOnActivate is true and active is changed to true, the tab should be focused', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const wrapper = mount<Tab>(<Tab focusOnActivate />, {attachTo: div});
  assert.notEqual(document.activeElement, wrapper.getDOMNode());
  wrapper.setProps({active: true});
  assert.equal(document.activeElement, wrapper.getDOMNode());
  div.remove();
});

test('when props.focusOnActivate is false, an active tab should not be focused on mount', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const wrapper = mount<Tab>(<Tab active focusOnActivate={false} />, {
    attachTo: div,
  });
  assert.notEqual(document.activeElement, wrapper.getDOMNode());
  div.remove();
});

test('when props.focusOnActivate is false and active is changed to true, the tab should not be focused', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const wrapper = mount<Tab>(<Tab focusOnActivate={false} />, {attachTo: div});
  assert.notEqual(document.activeElement, wrapper.getDOMNode());
  wrapper.setProps({active: true});
  assert.notEqual(document.activeElement, wrapper.getDOMNode());
  div.remove();
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if state.classList contains class', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  const hasClass = wrapper.instance().adapter.hasClass('test-class');
  assert.isTrue(hasClass);
});

test('#adapter.hasClass returns false if state.classList contains class', () => {
  const wrapper = shallow<Tab>(<Tab />);
  const hasClass = wrapper.instance().adapter.hasClass('test-class');
  assert.isFalse(hasClass);
});

test('#adapter.setAttr sets tabIndex on state', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().adapter.setAttr('tabIndex', '0');
  assert.equal(wrapper.state().tabIndex, 0);
});

test('#adapter.setAttr sets aria-selected on state', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().adapter.setAttr('aria-selected', 'true');
  assert.equal(wrapper.state()['aria-selected'], 'true');
});

test('#adapter.getOffsetLeft returns tabRef.offsetLeft', () => {
  const wrapper = mount<Tab>(<Tab />);
  assert.equal(
    wrapper.instance().adapter.getOffsetLeft(),
    wrapper.instance().tabRef.current!.offsetLeft
  );
});

test('#adapter.getOffsetWidth returns tabRef.offsetWidth', () => {
  const wrapper = mount<Tab>(<Tab>Text</Tab>);
  assert.equal(
    wrapper.instance().adapter.getOffsetWidth(),
    wrapper.instance().tabRef.current!.offsetWidth
  );
});

test('#adapter.getContentOffsetLeft returns tabContentRef.offsetLeft', () => {
  const wrapper = mount<Tab>(<Tab>Text</Tab>);
  assert.equal(
    wrapper.instance().adapter.getContentOffsetLeft(),
    wrapper.instance().tabContentRef.current!.offsetLeft
  );
});

test('#adapter.getContentOffsetWidth returns tabContentRef.offsetWidth', () => {
  const wrapper = mount<Tab>(<Tab>Text</Tab>);
  assert.equal(
    wrapper.instance().adapter.getContentOffsetWidth(),
    wrapper.instance().tabContentRef.current!.offsetWidth
  );
});

test('#adapter.focus focuses the tabRef', () => {
  const wrapper = mount<Tab>(<Tab>Text</Tab>);
  wrapper.instance().tabRef.current!.focus = td.func() as () => void;
  wrapper.instance().adapter.focus();
  td.verify(wrapper.instance().tabRef.current!.focus(), {times: 1});
});

test('#adapter.activateIndicator sets state.activateIndicator and state.previousIndicatorClientRect', () => {
  const clientRect = ({test: 1} as unknown) as ClientRect;
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().adapter.activateIndicator(clientRect);
  assert.equal(wrapper.state().activateIndicator, true);
  assert.equal(wrapper.state().previousIndicatorClientRect, clientRect);
});

test('#adapter.deactivateIndicator sets state.activateIndicator', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().adapter.deactivateIndicator();
  assert.equal(wrapper.state().activateIndicator, false);
});

test('#activate calls foundation.activate', () => {
  const clientRect = ({test: 1} as unknown) as ClientRect;
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().foundation.activate = td.func<
    (previousIndicatorClientRect?: ClientRect) => null
  >();
  wrapper.instance().activate(clientRect);
  td.verify(wrapper.instance().foundation.activate(clientRect), {times: 1});
});

test('#deactivate calls foundation.deactivate', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().foundation.deactivate = td.func<() => null>();
  wrapper.instance().deactivate();
  td.verify(wrapper.instance().foundation.deactivate(), {times: 1});
});

test('#computeIndicatorClientRect returns the tabIndicatorRef clientRect', () => {
  const wrapper = mount<Tab>(<Tab />);
  wrapper.instance().tabIndicatorRef.current!.computeContentClientRect = coerceForTesting<
    () => ClientRect
  >(td.func());
  wrapper.instance().computeIndicatorClientRect();
  td.verify(
    wrapper.instance().tabIndicatorRef.current!.computeContentClientRect(),
    {times: 1}
  );
});

test('#computeDimensions calls foundation.computeDimensions', () => {
  const wrapper = shallow<Tab>(<Tab />);
  wrapper.instance().foundation.computeDimensions = td.func<
    () => MDCTabDimensions
  >();
  wrapper.instance().computeDimensions();
  td.verify(wrapper.instance().foundation.computeDimensions(), {times: 1});
});

test('#focus focuses the tabRef', () => {
  const wrapper = mount<Tab>(<Tab>Text</Tab>);
  wrapper.instance().tabRef.current!.focus = td.func() as () => void;
  wrapper.instance().focus();
  td.verify(wrapper.instance().tabRef.current!.focus(), {times: 1});
});

test('tab should have the role=tab', () => {
  const wrapper = shallow(<Tab />);
  assert.equal(wrapper.props().role, 'tab');
});

test('tabIndex set on state will update tabindex on the button element', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({tabIndex: 0});
  assert.equal(wrapper.props().tabIndex, 0);
});

test('aria-selected set on state will update tabindex on the button element', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({['aria-selected']: true});
  assert.isTrue(wrapper.props()['aria-selected']);
});

test('should render content with children', () => {
  const wrapper = shallow(<Tab>meow</Tab>);
  const content = wrapper.children().first();
  assert.isTrue(content.hasClass('mdc-tab__content'));
  assert.equal(content.text(), 'meow');
});

test('should render content with icon and text children', () => {
  const wrapper = shallow(
    <Tab>
      <i className='mdc-tab__icon material-icons'>favorite</i>
      <span className='mdc-tab__text-label'>meow</span>
    </Tab>
  );
  const content = wrapper.children().first();
  const icon = content.children().first();
  const textLabel = content.children().last();
  assert.equal(icon.text(), 'favorite');
  assert.equal(icon.type(), 'i');
  assert.equal(textLabel.text(), 'meow');
  assert.equal(textLabel.type(), 'span');
});

test('should render mdc tab ripple', () => {
  const wrapper = shallow(<Tab />);
  assert.exists(wrapper.find('.mdc-tab__ripple'));
});

test('should render default TabIndicatorRef', () => {
  const wrapper = shallow(<Tab />);
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.type(), TabIndicatorRef);
});

test('state.activateIndicator should render indicator with props.active true', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({activateIndicator: true});
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().active);
});

test('state.previousIndicatorClientRect should render indicator with same props.previousIndicatorClientRect', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab />);
  wrapper.setState({previousIndicatorClientRect: clientRect});
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.props().previousIndicatorClientRect, clientRect);
});

test('props.active should render indicator with props.active true', () => {
  const wrapper = shallow(<Tab active />);
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().active);
});

test('props.isFadingIndicator should render indicator with props.fade true', () => {
  const wrapper = shallow(<Tab isFadingIndicator />);
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().fade);
});

test('props.previousIndicatorClientRect should render indicator with same props.previousIndicatorClientRect', () => {
  const clientRect = ({test: 1} as unknown) as ClientRect;
  const wrapper = shallow(<Tab previousIndicatorClientRect={clientRect} />);
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.props().previousIndicatorClientRect, clientRect);
});

test('props.indicatorContent renders indicator with props.icon true', () => {
  const wrapper = shallow(
    <Tab indicatorContent={<i className='icon'>icon</i>} />
  );
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().icon);
});

test('props.indicatorContent should render indicator with props.active true if props.active is true', () => {
  const wrapper = shallow(
    <Tab active indicatorContent={<i className='icon'>icon</i>} />
  );
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().active);
});

test('props.indicatorContent should render indicator with same props.previousIndicatorClientRect', () => {
  const clientRect = ({test: 1} as unknown) as ClientRect;
  const wrapper = shallow(
    <Tab
      previousIndicatorClientRect={clientRect}
      indicatorContent={<i className='icon'>icon</i>}
    />
  );
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.props().previousIndicatorClientRect, clientRect);
});

test('props.indicatorContent should render with a ref attached', () => {
  const wrapper = mount<Tab>(
    <Tab indicatorContent={<i className='icon'>icon</i>} />
  );
  assert.instanceOf(
    wrapper.instance().tabIndicatorRef.current,
    TabIndicatorRef
  );
});

test('props.isMinWidthIndicator renders indicator within the content element', () => {
  const wrapper = shallow<Tab>(<Tab isMinWidthIndicator />);
  const content = wrapper.children().first();
  const tabIndicatorRef = content.find(TabIndicatorRef);
  assert.equal(tabIndicatorRef.length, 1);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Tab>(<Tab />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => null>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('on focus event calls handleFocus on TabRippleRef', () => {
  const wrapper = mount<Tab>(<Tab />);
  const ripple = wrapper.instance().tabRippleRef.current;
  ripple!.handleFocus = coerceForTesting<
    (e: React.FocusEvent<HTMLButtonElement>) => void
  >(td.func());
  wrapper.simulate('focus');
  td.verify(ripple!.handleFocus(td.matchers.isA(Object)), {times: 1});
});

test('on blur event calls handleBlur on TabRippleRef', () => {
  const wrapper = mount<Tab>(<Tab />);
  const ripple = wrapper.instance().tabRippleRef.current;
  ripple!.handleBlur = coerceForTesting<
    (e: React.FocusEvent<HTMLButtonElement>) => void
  >(td.func());
  wrapper.simulate('blur');
  td.verify(ripple!.handleBlur(td.matchers.isA(Object)), {times: 1});
});
