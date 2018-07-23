import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import Select from '../../../packages/select/index';

suite('Select');

test('has mdc-select class', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.hasClass('mdc-select'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Select
    label='my label'
    className='test-class-name'
  />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('creates foundation', () => {
  const wrapper = mount(<Select label='my label' />);
  assert.exists(wrapper.instance().foundation_);
});

test('#foundation_setValue gets called when state.value updates', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().foundation_.setValue = td.func();
  const value = 'value';
  wrapper.setState({value});
  td.verify(wrapper.instance().foundation_.setValue(value), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Select label='my label' />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('props.outlined will add mdc-select--outlined', () => {
  const wrapper = shallow(<Select label='my label' outlined />);
  assert.isTrue(wrapper.hasClass('mdc-select--outlined'));
});

test('props.disabled will add mdc-select--disabled', () => {
  const wrapper = shallow(<Select label='my label' disabled />);
  assert.isTrue(wrapper.hasClass('mdc-select--disabled'));
});

test('props.box will add mdc-select--box', () => {
  const wrapper = shallow(<Select label='my label' box />);
  assert.isTrue(wrapper.hasClass('mdc-select--box'));
});

test('a class in state.classList will be added to the select', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['best-class-name'])});
  assert.isTrue(wrapper.hasClass('best-class-name'));
});

test('#adapter.addClass adds to state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.addClass('my-added-class');
  assert.isTrue(wrapper.state().classList.has('my-added-class'));
});

test('#adapter.removeClass removes from state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['my-added-class'])});
  wrapper.instance().adapter.removeClass('my-added-class');
  assert.isFalse(wrapper.state().classList.has('my-added-class'));
});

test('#adapter.hasClass returns true if the string is in state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.setState({classList: new Set(['my-added-class'])});
  assert.isTrue(wrapper.instance().adapter.hasClass('my-added-class'));
});

test('#adapter.hasClass returns false if the string is not in state.classList', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isFalse(wrapper.instance().adapter.hasClass('my-added-class'));
});

test('#adapter.isRtl returns true if parent has dir="rtl"', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.style.direction = 'rtl';
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(<Select label='my label' />, options);
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRtl());
  document.body.style.direction = 'initial';
  div.remove();
});

test('#adapter.isRtl returns false if parent is not dir="rtl"', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.style.direction = 'ltr';
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(<Select label='my label' />, options);
  assert.isFalse(wrapper.instance().foundation_.adapter_.isRtl());
  document.body.style.direction = 'initial';
  div.remove();
});

test('adapter.getValue returns state.value', () => {
  const wrapper = shallow(<Select label='my label' />);
  const value = 'value';
  wrapper.setState({value});
  assert.equal(wrapper.instance().adapter.getValue(), value);
});

test('#adapter.floatLabel set state.labelIsFloated', () => {
  const wrapper = shallow(<Select label='my label' />);
  wrapper.instance().adapter.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.hasLabel returns true if label exists', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.instance().adapter.hasLabel());
});

test('#adapter.hasgetLabelWidth returns state.labelWidth', () => {
  const wrapper = shallow(<Select label='my label' />);
  assert.isTrue(wrapper.instance().adapter.hasLabel());
});
