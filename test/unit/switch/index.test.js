import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import Switch from '../../../packages/switch/index';

suite('Switch');

test('creates foundation', () => {
  const wrapper = shallow(<Switch />);
  assert.exists(wrapper.instance().foundation_);
});

test('renders switch', () => {
  const wrapper = shallow(<Switch />);
  assert.exists(wrapper.find('.mdc-switch'));
});

test('renders thumb underlay', () => {
  const wrapper = shallow(<Switch />);
  const ThumbUnderlay = require('../../../packages/switch/ThumbUnderlay');
  assert.equal(wrapper.childAt(1).type(), ThumbUnderlay.default);
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Switch className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has disabled class when props.disabled is true', () => {
  const wrapper = shallow(<Switch disabled />);
  assert.isTrue(wrapper.hasClass('mdc-switch--disabled'));
});

test('has checked class when props.checked is true', () => {
  const wrapper = shallow(<Switch checked />);
  assert.isTrue(wrapper.hasClass('mdc-switch--checked'));
});

test('#foundation_.handleChange gets called when state.checked updates', () => {
  const wrapper = shallow(<Switch />);
  wrapper.instance().foundation_.handleChange = td.func();
  wrapper.setState({checked: true});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Switch />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<Switch />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Switch />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.isNativeControlChecked returns state.checked', () => {
  const wrapper = shallow(<Switch />);
  wrapper.setState({checked: true});
  assert.isTrue(wrapper.instance().foundation_.adapter_.isNativeControlChecked());
  wrapper.setState({checked: false});
  assert.isFalse(wrapper.instance().foundation_.adapter_.isNativeControlChecked());
});
