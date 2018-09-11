import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import td from 'testdouble';
import Switch from '../../../packages/switch/index';

suite('Switch');

test('creates foundation', () => {
  const wrapper = shallow(<Switch />);
  assert.exists(wrapper.instance().foundation_);
});

test('has mdc-switch class', () => {
  const wrapper = shallow(<Switch />);
  assert.exists(wrapper.find('.mdc-switch'));
});

test('renders thumb underlay and native control', () => {
  const wrapper = shallow(<Switch />);
  const ThumbUnderlay = require('../../../packages/switch/ThumbUnderlay');
  const NativeControl = require('../../../packages/switch/NativeControl');
  assert.equal(wrapper.childAt(1).type(), ThumbUnderlay.default);
  assert.equal(wrapper.childAt(1).childAt(0).type(), NativeControl.default);
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

test('#foundation_.setChecked gets called when prop.checked updates', () => {
  const wrapper = shallow(<Switch />);
  wrapper.instance().foundation_.setChecked = td.func();
  wrapper.setProps({checked: true});
  td.verify(wrapper.instance().foundation_.setChecked(true), {times: 1});
});

test('#foundation_.setDisabled gets called when prop.disabled updates', () => {
  const wrapper = shallow(<Switch />);
  wrapper.instance().foundation_.setDisabled = td.func();
  wrapper.setProps({disabled: true});
  td.verify(wrapper.instance().foundation_.setDisabled(true), {times: 1});
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

test('#adapter.setNativeControlChecked updates state.nativeControlChecked', () => {
  const wrapper = shallow(<Switch />);

  wrapper.instance().foundation_.adapter_.setNativeControlChecked(true);
  assert.isTrue(wrapper.state().nativeControlChecked);
});

test('#state.nativeControlChecked updates NativeControl', () => {
  const wrapper = mount(<Switch />);

  wrapper.setState({nativeControlChecked: true});
  assert.isTrue(wrapper.find('.mdc-switch__native-control').props().checked);
});

test('#adapter.setNativeControlDisabled updates state.nativeControlDisabled', () => {
  const wrapper = shallow(<Switch />);

  wrapper.instance().foundation_.adapter_.setNativeControlDisabled(true);
  assert.isTrue(wrapper.state().nativeControlDisabled);
});

test('#state.nativeControlChecked updates NativeControl', () => {
  const wrapper = mount(<Switch />);

  wrapper.setState({nativeControlChecked: true});
  assert.isTrue(wrapper.find('.mdc-switch__native-control').props().checked);
});

test('passes nativeControlId to NativeControl through props', () => {
  const wrapper = mount(<Switch nativeControlId={'test-id'}/>);
  assert.equal(wrapper.find('.mdc-switch__native-control').props().id, 'test-id');
});

test('calls foundation.handleChange in NativeControl props.onChange', () => {
  const onChange = td.func();
  const wrapper = mount(<Switch onChange={onChange}/>);
  const nativeControl = wrapper.find('.mdc-switch__native-control');
  const mockEvt = {
    target: {
      checked: true,
    },
  };
  wrapper.instance().foundation_.handleChange = td.func();
  nativeControl.props().onChange(mockEvt);
  td.verify(wrapper.instance().foundation_.handleChange(mockEvt), {times: 1});
});
