import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import TabIndicator from '../../../packages/tab-indicator/index';
import MaterialIcon from '../../../packages/material-icon/index';

suite('TabIndicator');

test('classNames adds classes', () => {
  const wrapper = shallow(<TabIndicator className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator'));
});

test('adds the fade class if props.fade is true', () => {
  const wrapper = shallow(<TabIndicator fade />);
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator--fade'));
});

test('adds the active class if props.active is true', () => {
  const wrapper = shallow(<TabIndicator active />);
  assert.isTrue(wrapper.hasClass('mdc-tab-indicator--active'));
});

test('adds the icon class to the content element if props.icon is true', () => {
  const wrapper = shallow(<TabIndicator icon />);
  const contentElement = wrapper.children().first();
  assert.isTrue(contentElement.hasClass('mdc-tab-indicator__content--icon'));
});

test('adds the underline class to the content element by default', () => {
  const wrapper = shallow(<TabIndicator />);
  const contentElement = wrapper.children().first();
  assert.isTrue(contentElement.hasClass('mdc-tab-indicator__content--underline'));
});

test('if props.active changes from true to false, it calls deactivate', () => {
  const wrapper = shallow(<TabIndicator active />);
  wrapper.instance().foundation_.deactivate = td.func();
  wrapper.setProps({active: false});
  td.verify(wrapper.instance().foundation_.deactivate(), {times: 1});
});

test('if props.active changes from false to true, it calls activate', () => {
  const previousIndicatorClientRect = {width: 20};
  const wrapper = shallow(<TabIndicator previousIndicatorClientRect={previousIndicatorClientRect} />);
  wrapper.instance().foundation_.activate = td.func();
  wrapper.setProps({active: true});
  td.verify(wrapper.instance().foundation_.activate(previousIndicatorClientRect), {times: 1});
});

test('#adapter.addClass updates state.classList', () => {
  const wrapper = shallow(<TabIndicator />);
  wrapper.instance().adapter.addClass('meow-class');
  assert.isTrue(wrapper.state().classList.has('meow-class'));
});

test('#adapter.removeClass updates state.classList', () => {
  const wrapper = shallow(<TabIndicator />);
  wrapper.setState({classList: new Set(['meow-class'])});
  wrapper.instance().adapter.removeClass('meow-class');
  assert.isFalse(wrapper.state().classList.has('meow-class'));
});

test('#adapter.setContentStyleProperty sets the style property on the contentElement', () => {
  const wrapper = mount(<TabIndicator />);
  const transform = 'translateX(10px)';
  wrapper.instance().adapter.setContentStyleProperty('transform', transform);
  const contentElement = wrapper.find('.mdc-tab-indicator__content').getDOMNode();
  assert.equal(contentElement.style.transform, transform);
});

test('#adapter.computeContentClientRect calls getBoundingClientRect on the contentElement', () => {
  const wrapper = mount(<TabIndicator />);
  const contentElement = wrapper.find('.mdc-tab-indicator__content').getDOMNode();
  contentElement.getBoundingClientRect = td.func();
  wrapper.instance().adapter.computeContentClientRect();
  td.verify(contentElement.getBoundingClientRect(), {times: 1});
});

test('#computeContentClientRect calls getBoundingClientRect on the contentElement', () => {
  const wrapper = mount(<TabIndicator />);
  const contentElement = wrapper.find('.mdc-tab-indicator__content').getDOMNode();
  contentElement.getBoundingClientRect = td.func();
  wrapper.instance().computeContentClientRect();
  td.verify(contentElement.getBoundingClientRect(), {times: 1});
});

test('child element should be rendered', () => {
  const wrapper = shallow(<TabIndicator>
    <i>meow</i>
  </TabIndicator>);
  assert.equal(wrapper.children().first().type(), 'i');
  assert.equal(wrapper.children().first().text(), 'meow');
});

test('child element should include props.className and contentClasses', () => {
  const wrapper = shallow(<TabIndicator>
    <i className='test-class-name'>meow</i>
  </TabIndicator>);
  assert.isTrue(wrapper.children().first().hasClass('test-class-name'));
  assert.isTrue(wrapper.children().first().hasClass('mdc-tab-indicator__content'));
  assert.isTrue(wrapper.children().first().hasClass('mdc-tab-indicator__content--underline'));
});

test('child custom element should render correctly', () => {
  const wrapper = shallow(<TabIndicator>
    <MaterialIcon icon='favorite' />
  </TabIndicator>);
  assert.equal(wrapper.children().first().type(), MaterialIcon);
});

test('child custom element should have content classes', () => {
  const wrapper = shallow(<TabIndicator icon>
    <MaterialIcon icon='favorite' />
  </TabIndicator>);
  assert.isTrue(wrapper.children().first().hasClass('mdc-tab-indicator__content'));
  assert.isTrue(wrapper.children().first().hasClass('mdc-tab-indicator__content--icon'));
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TabIndicator />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
