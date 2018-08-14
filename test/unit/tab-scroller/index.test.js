import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabScroller from '../../../packages/tab-scroller/index';

suite('TabScroller');

test('classNames adds classes', () => {
  const wrapper = shallow(<TabScroller className='test-class-name'/>);
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
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().setStyleToElement('background-color', 'blue', 'scrollAreaStyleProperty');
  assert.equal(wrapper.state().scrollAreaStyleProperty.backgroundColor, 'blue');
});

test('#setStyleToElement adds single word style property to scrollAreaStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().setStyleToElement('margin', '24px', 'scrollAreaStyleProperty');
  assert.equal(wrapper.state().scrollAreaStyleProperty.margin, '24px');
});

test('#setStyleToElement adds a dashed style property to scrollContentStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().setStyleToElement('background-color', 'blue', 'scrollContentStyleProperty');
  assert.equal(wrapper.state().scrollContentStyleProperty.backgroundColor, 'blue');
});

test('#setStyleToElement adds single word style property to scrollContentStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(wrapper.state().scrollContentStyleProperty.margin, '24px');
});

test('#setStyleToElement overrides a previous dashed style property to scrollContentStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.setState({scrollContentStyleProperty: {
    backgroundColor: 'orange'
  }});
  wrapper.instance().setStyleToElement('background-color', 'blue', 'scrollContentStyleProperty');
  assert.equal(wrapper.state().scrollContentStyleProperty.backgroundColor, 'blue');
});

test('#setStyleToElement overrides a single word style property to scrollContentStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.setState({scrollContentStyleProperty: {
    margin: '50px'
  }});
  wrapper.instance().setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(wrapper.state().scrollContentStyleProperty.margin, '24px');
});

test('#setStyleToElement does not override a different style property on scrollContentStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.setState({scrollContentStyleProperty: {
    backgroundColor: 'orange'
  }});
  wrapper.instance().setStyleToElement('margin', '24px', 'scrollContentStyleProperty');
  assert.equal(wrapper.state().scrollContentStyleProperty.margin, '24px');
  assert.equal(wrapper.state().scrollContentStyleProperty.backgroundColor, 'orange');
});

test('#adapter.eventTargetMatchesSelector matches a selector passed as argument', () => {
  const wrapper = shallow(<TabScroller />);
  const target = document.createElement('div');
  target.classList.add('test-class');
  const eventTargetMatchesSelector
    = wrapper.instance().adapter.eventTargetMatchesSelector(target, '.test-class');
  assert.isTrue(eventTargetMatchesSelector);
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass adds to state.classList', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.setState({classList: new Set(['test-class'])})
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.addScrollAreaClass adds to state.areaClassList', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().adapter.addScrollAreaClass('test-class');
  assert.isTrue(wrapper.state().areaClassList.has('test-class'));
});

test('#adapter.setScrollAreaStyleProperty adds to state.scrollAreaStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().adapter.setScrollAreaStyleProperty('margin', '24px');
  assert.equal(wrapper.state().scrollAreaStyleProperty.margin, '24px');
});

test('#adapter.setScrollContentStyleProperty adds to state.scrollAreaStyleProperty', () => {
  const wrapper = shallow(<TabScroller />);
  wrapper.instance().adapter.setScrollContentStyleProperty('margin', '24px');
  assert.equal(wrapper.state().scrollContentStyleProperty.margin, '24px');
});

test('#adapter.getScrollContentStyleValue adds to state.scrollAreaStyleProperty', () => {
  const wrapper = mount(<TabScroller />);
  const node = wrapper.getDOMNode();
  document.body.append(node);
  wrapper.instance().contentElement_.current.style.setProperty('color', 'lightblue');
  const content = document.querySelector('.mdc-tab-scroller__scroll-content');
  const contentStyleValue = wrapper.instance().foundation_.adapter_.getScrollContentStyleValue('color');
  assert.equal(contentStyleValue, window.getComputedStyle(content).getPropertyValue('color'));
  node.remove();
});

test('#adapter.setScrollAreaScrollLeft adds to state.scrollAreaStyleProperty', () => {
  const wrapper = mount(<TabScroller><div>TAB</div></TabScroller>);
  const node = wrapper.getDOMNode();
  document.body.append(node);
  wrapper.instance().foundation_.adapter_.setScrollAreaScrollLeft(101);
  console.log(wrapper.instance().areaElement_.current.scrollLeft)
  assert.isAtLeast(wrapper.instance().areaElement_.current.scrollLeft, 0);
  node.remove();
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TabScroller />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
