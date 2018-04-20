import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import FloatingLabel from '../../../packages/floating-label';

suite('Floating Label');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <FloatingLabel className='test-class-name'>Test</FloatingLabel>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-floating-label'));
});

test('adds text to children', () => {
  const wrapper = shallow(<FloatingLabel>Test</FloatingLabel>);
  assert.equal(wrapper.text(), 'Test');
});

test('creates labelElement', () => {
  const wrapper = mount(<FloatingLabel />);
  assert.exists(wrapper.instance().labelElement.current);
});

test('#initializeFoundation creates foundation', () => {
  const wrapper = shallow(<FloatingLabel />);
  assert.exists(wrapper.instance().foundation_);
});

test('initializing with shouldFloat to true floats the label', () => {
  const wrapper = shallow(<FloatingLabel shouldFloat/>);
  assert.isTrue(wrapper.hasClass('mdc-floating-label--float-above'));
});

test('initializing with shouldShake to true shakes the label', () => {
  const wrapper = shallow(<FloatingLabel shouldShake/>);
  assert.isTrue(wrapper.hasClass('mdc-floating-label--shake'));
});

test('calls setWidth with the offsetWidth of the labelElement', () => {
  const setWidth = td.func();
  const wrapper = mount(
    <FloatingLabel setWidth={setWidth}>Test</FloatingLabel>);
  td.verify(setWidth(wrapper.getDOMNode().offsetWidth), {times: 1});
});

test('#componentWillReceiveProps updating shouldFloat to true floats the label', () => {
  const wrapper = shallow(<FloatingLabel/>);
  wrapper.setProps({shouldFloat: true});
  assert.isTrue(wrapper.hasClass('mdc-floating-label--float-above'));
});

test('#componentWillReceiveProps updating shouldShake to true shakes the label', () => {
  const wrapper = shallow(<FloatingLabel/>);
  wrapper.setProps({shouldShake: true});
  assert.isTrue(wrapper.hasClass('mdc-floating-label--shake'));
});

test('#componentDidUpdate updating the children updates width', () => {
  const setWidth = td.func();
  const wrapper = mount(
    <FloatingLabel setWidth={setWidth}>Test</FloatingLabel>);
  wrapper.setProps({children: 'Test More Text'});
  td.verify(setWidth(wrapper.getDOMNode().offsetWidth), {times: 2});
});

test('initializing shouldFloat to true, and then updating it to false ' +
  'removes the class', () => {
  const wrapper = shallow(<FloatingLabel shouldFloat/>);
  wrapper.setProps({shouldFloat: false});
  assert.isFalse(wrapper.hasClass('mdc-floating-label--float-above'));
});

test('on animationend should trigger onShakeEnd and remove the shake class', () => {
  const onShakeEnd = td.func();
  const wrapper = shallow(<FloatingLabel onShakeEnd={onShakeEnd}/>);
  wrapper.setProps({shouldShake: true});
  assert.isTrue(wrapper.hasClass('mdc-floating-label--shake'));
  wrapper.simulate('animationEnd');
  td.verify(onShakeEnd(), {times: 1});
  assert.isFalse(wrapper.hasClass('mdc-floating-label--shake'));
});

test('#adapter.addClass', () => {
  const wrapper = mount(<FloatingLabel />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass', () => {
  const wrapper = mount(<FloatingLabel />);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<FloatingLabel />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
