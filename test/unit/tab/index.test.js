import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import Tab from '../../../packages/tab/index';
import TabIndicator from '../../../packages/tab-indicator/index';

suite('Tab');

test('classNames adds classes', () => {
  const wrapper = shallow(<Tab className='test-class-name'/>);
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

test('adds the active class if props.active is true on mount', () => {
  const wrapper = shallow(<Tab active />);
  assert.isTrue(wrapper.hasClass('mdc-tab--active'));
});

test('adds a class from state.classList', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('has a foundation after mount', () => {
  const wrapper = mount(<Tab active />);
  assert.exists(wrapper.instance().foundation_);
});

test('if props.active updates to true, activate is called with previousIndicatorClientRect prop', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab previousIndicatorClientRect={clientRect}/>);
  wrapper.instance().activate = td.func();
  wrapper.setProps({active: true});
  td.verify(wrapper.instance().activate(clientRect), {times: 1});
});

test('if props.active updates to false, foundation.deactivate is called', () => {
  const wrapper = shallow(<Tab active />);
  wrapper.instance().deactivate = td.func();
  wrapper.setProps({active: false});
  td.verify(wrapper.instance().deactivate(), {times: 1});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<Tab />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if state.classList contains class', () => {
  const wrapper = shallow(<Tab />);
  wrapper.setState({classList: new Set(['test-class'])});
  const hasClass = wrapper.instance().adapter.hasClass('test-class');
  assert.isTrue(hasClass);
});

test('#adapter.hasClass returns false if state.classList contains class', () => {
  const wrapper = shallow(<Tab />);
  const hasClass = wrapper.instance().adapter.hasClass('test-class');
  assert.isFalse(hasClass);
});

test('#adapter.setAttr sets tabIndex on state', () => {
  const wrapper = shallow(<Tab />);
  wrapper.instance().adapter.setAttr('tabIndex', 0);
  assert.equal(wrapper.state().tabIndex, 0);
});

test('#adapter.setAttr sets aria-selected on state', () => {
  const wrapper = shallow(<Tab />);
  wrapper.instance().adapter.setAttr('aria-selected', true);
  assert.isTrue(wrapper.state()['aria-selected']);
});

test('#adapter.getOffsetLeft returns tabElement_.offsetLeft', () => {
  const wrapper = mount(<Tab />);
  assert.equal(wrapper.instance().adapter.getOffsetLeft(), wrapper.instance().tabElement_.current.offsetLeft);
});

test('#adapter.getOffsetWidth returns tabElement_.offsetWidth', () => {
  const wrapper = mount(<Tab>Text</Tab>);
  assert.equal(wrapper.instance().adapter.getOffsetWidth(), wrapper.instance().tabElement_.current.offsetWidth);
});

test('#adapter.getContentOffsetLeft returns tabContentElement_.offsetLeft', () => {
  const wrapper = mount(<Tab>Text</Tab>);
  assert.equal(
    wrapper.instance().adapter.getContentOffsetLeft(),
    wrapper.instance().tabContentElement_.current.offsetLeft);
});

test('#adapter.getContentOffsetWidth returns tabContentElement_.offsetWidth', () => {
  const wrapper = mount(<Tab>Text</Tab>);
  assert.equal(
    wrapper.instance().adapter.getContentOffsetWidth(),
    wrapper.instance().tabContentElement_.current.offsetWidth);
});

test('#adapter.focus focuses the tabElement_', () => {
  const wrapper = mount(<Tab>Text</Tab>);
  wrapper.instance().tabElement_.current.focus = td.func();
  wrapper.instance().adapter.focus();
  td.verify(wrapper.instance().tabElement_.current.focus(), {times: 1});
});

test('#adapter.activateIndicator sets state.activateIndicator and state.previousIndicatorClientRect', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab />);
  wrapper.instance().adapter.activateIndicator(clientRect);
  assert.equal(wrapper.state().activateIndicator, true);
  assert.equal(wrapper.state().previousIndicatorClientRect, clientRect);
});

test('#adapter.deactivateIndicator sets state.activateIndicator', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab />);
  wrapper.instance().adapter.deactivateIndicator(clientRect);
  assert.equal(wrapper.state().activateIndicator, false);
});

test('#activate calls foundation.activate', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab/>);
  wrapper.instance().foundation_.activate = td.func();
  wrapper.instance().activate(clientRect);
  td.verify(wrapper.instance().foundation_.activate(clientRect), {times: 1});
});

test('#deactivate calls foundation.deactivate', () => {
  const wrapper = shallow(<Tab/>);
  wrapper.instance().foundation_.deactivate = td.func();
  wrapper.instance().deactivate();
  td.verify(wrapper.instance().foundation_.deactivate(), {times: 1});
});

test('#computeIndicatorClientRect returns the tabIndicator_ clientRect', () => {
  const wrapper = mount(<Tab/>);
  wrapper.instance().tabIndicator_.current.computeContentClientRect = td.func();
  wrapper.instance().computeIndicatorClientRect();
  td.verify(wrapper.instance().tabIndicator_.current.computeContentClientRect(), {times: 1});
});

test('#computeDimensions calls foundation.computeDimensions', () => {
  const wrapper = shallow(<Tab/>);
  wrapper.instance().foundation_.computeDimensions = td.func();
  wrapper.instance().computeDimensions();
  td.verify(wrapper.instance().foundation_.computeDimensions(), {times: 1});
});

test('#focus focuses the tabElement_', () => {
  const wrapper = mount(<Tab>Text</Tab>);
  wrapper.instance().tabElement_.current.focus = td.func();
  wrapper.instance().focus();
  td.verify(wrapper.instance().tabElement_.current.focus(), {times: 1});
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
  const wrapper = shallow(<Tab>
    <i className='mdc-tab__icon material-icons'>favorite</i>
    <span className='mdc-tab__text-label'>meow</span>
  </Tab>);
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

test('should render default TabIndicator', () => {
  const wrapper = shallow(<Tab />);
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.type(), TabIndicator);
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
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab previousIndicatorClientRect={clientRect} />);
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.props().previousIndicatorClientRect, clientRect);
});

test('props.indicatorContent renders indicator with props.icon true', () => {
  const wrapper = shallow(<Tab
    indicatorContent={<i className='icon'>icon</i>}
  />);
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().icon);
});

test('props.indicatorContent should render indicator with props.active true if props.active is true', () => {
  const wrapper = shallow(<Tab
    active
    indicatorContent={<i className='icon'>icon</i>}
  />);
  const indicator = wrapper.childAt(1);
  assert.isTrue(indicator.props().active);
});

test('props.indicatorContent should render indicator with same props.previousIndicatorClientRect', () => {
  const clientRect = {test: 1};
  const wrapper = shallow(<Tab
    previousIndicatorClientRect={clientRect}
    indicatorContent={<i className='icon'>icon</i>}
  />);
  const indicator = wrapper.childAt(1);
  assert.equal(indicator.props().previousIndicatorClientRect, clientRect);
});

test('props.indicatorContent should render with a ref attached', () => {
  const wrapper = mount(<Tab
    indicatorContent={<i className='icon'>icon</i>}
  />);
  assert.instanceOf(wrapper.instance().tabIndicator_.current, TabIndicator);
});

test('props.isMinWidthIndicator renders indicator within the content element', () => {
  const wrapper = shallow(<Tab isMinWidthIndicator />);
  const content = wrapper.children().first();
  const tabIndicator = content.find(TabIndicator);
  assert.equal(tabIndicator.length, 1);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Tab />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
