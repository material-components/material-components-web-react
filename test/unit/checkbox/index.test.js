import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import {Checkbox} from '../../../packages/checkbox/index';

suite('Checkbox');

test('creates foundation', () => {
  const wrapper = shallow(<Checkbox />);
  assert.exists(wrapper.instance().foundation_);
});

test('has mdc-checkbox class', () => {
  const wrapper = shallow(<Checkbox />);
  assert.exists(wrapper.find('.mdc-checkbox'));
});

test('renders native control', () => {
  const wrapper = shallow(<Checkbox />);
  assert.exists(wrapper.find('.mdc-checkbox__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Checkbox className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has disabled class when props.disabled is true', () => {
  const wrapper = shallow(<Checkbox disabled />);
  assert.isTrue(wrapper.find('.mdc-checkbox').hasClass('mdc-checkbox--disabled'));
});

test('native control props.disabled is true when props.disabled is true', () => {
  const wrapper = shallow(<Checkbox disabled />);
  const nativeControl = wrapper.childAt(0);
  assert.isTrue(nativeControl.props().disabled);
});

test('native control props.checked is true when props.checked is true', () => {
  const wrapper = shallow(<Checkbox checked />);
  const nativeControl = wrapper.childAt(0);
  assert.isTrue(nativeControl.props().checked);
});

test('#foundation_.handleChange gets called when prop.checked updates', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.handleChange = td.func();
  wrapper.setProps({checked: true});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#foundation_.handleChange gets called when prop.indeterminate updates', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.handleChange = td.func();
  wrapper.setProps({indeterminate: true});
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('#foundation_.setDisabled gets called when prop.disabled updates', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.setDisabled = td.func();
  wrapper.setProps({disabled: true});
  td.verify(wrapper.instance().foundation_.setDisabled(true), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Checkbox />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.isChecked returns state.checked', () => {
  const wrapper = shallow(<Checkbox />);
  assert.equal(wrapper.instance().foundation_.adapter_.isChecked(), wrapper.state().checked);
});

test('#adapter.isIndeterminate returns state.indeterminate', () => {
  const wrapper = shallow(<Checkbox />);
  assert.equal(wrapper.instance().foundation_.adapter_.isIndeterminate(), wrapper.state().indeterminate);
});

test('#adapter.setNativeControlAttr sets aria-checked state', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.adapter_.setNativeControlAttr('aria-checked', true);
  assert.isTrue(wrapper.state()['aria-checked']);
});

test('#adapter.removeNativeControlAttr sets aria-checked state as false', () => {
  const wrapper = shallow(<Checkbox />);
  wrapper.instance().foundation_.adapter_.removeNativeControlAttr('aria-checked');
  assert.isFalse(wrapper.state()['aria-checked']);
});

test('passes nativeControlId to NativeControl through props', () => {
  const wrapper = shallow(<Checkbox nativeControlId={'test-id'}/>);
  assert.equal(wrapper.childAt(0).props().id, 'test-id');
});

test('calls foundation.handleChange in native control props.onChange', () => {
  const wrapper = shallow(<Checkbox />);
  const nativeControl = wrapper.childAt(0);
  const mockEvt = {
    target: {
      checked: true,
      indeterminate: false,
    },
  };
  wrapper.instance().foundation_.handleChange = td.func();
  nativeControl.props().onChange(mockEvt);
  td.verify(wrapper.instance().foundation_.handleChange(), {times: 1});
});

test('calls props.onChange in native control props.onChange', () => {
  const onChange = td.func();
  const wrapper = shallow(<Checkbox onChange={onChange}/>);
  const nativeControl = wrapper.childAt(0);
  const mockEvt = {
    target: {
      checked: true,
      indeterminate: false,
    },
  };
  nativeControl.props().onChange(mockEvt);
  td.verify(onChange(mockEvt), {times: 1});
});
