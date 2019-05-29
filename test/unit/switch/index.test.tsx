import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import td from 'testdouble';
import Switch from '../../../packages/switch/index';
import {coerceForTesting} from '../helpers/types';

suite('Switch');

const getAdapter = (instance: Switch) => {
  // @ts-ignore
  return instance.foundation.adapter_;
};

test('creates foundation', () => {
  const wrapper = shallow<Switch>(<Switch />);
  assert.exists(wrapper.instance().foundation);
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
  assert.equal(
    wrapper
      .childAt(1)
      .childAt(0)
      .type(),
    NativeControl.default
  );
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

test('#foundation.setChecked gets called when prop.checked updates', () => {
  const wrapper = shallow<Switch>(<Switch />);
  wrapper.instance().foundation.setChecked = td.func<
    (setChecked: boolean) => null
  >();
  wrapper.setProps({checked: true});
  td.verify(wrapper.instance().foundation.setChecked(true), {times: 1});
});

test('#foundation.setDisabled gets called when prop.disabled updates', () => {
  const wrapper = shallow<Switch>(<Switch />);
  wrapper.instance().foundation.setDisabled = td.func<
    (disabled: boolean) => null
  >();
  wrapper.setProps({disabled: true});
  td.verify(wrapper.instance().foundation.setDisabled(true), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<Switch>(<Switch />);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => null>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow<Switch>(<Switch />);
  getAdapter(wrapper.instance()).addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<Switch>(<Switch />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  getAdapter(wrapper.instance()).removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.setNativeControlChecked updates state.nativeControlChecked', () => {
  const wrapper = shallow<Switch>(<Switch />);
  getAdapter(wrapper.instance()).setNativeControlChecked(true);
  assert.isTrue(wrapper.state().nativeControlChecked);
});

test('#state.nativeControlChecked updates NativeControl', () => {
  const wrapper = mount(<Switch />);
  wrapper.setState({nativeControlChecked: true});
  assert.isTrue(wrapper.find('.mdc-switch__native-control').props().checked);
});

test('#adapter.setNativeControlDisabled updates state.nativeControlDisabled', () => {
  const wrapper = shallow<Switch>(<Switch />);
  getAdapter(wrapper.instance()).setNativeControlDisabled(true);
  assert.isTrue(wrapper.state().nativeControlDisabled);
});

test('#state.nativeControlChecked updates NativeControl', () => {
  const wrapper = mount(<Switch />);
  wrapper.setState({nativeControlChecked: true});
  assert.isTrue(wrapper.find('.mdc-switch__native-control').props().checked);
});

test('passes nativeControlId to NativeControl through props', () => {
  const wrapper = mount(<Switch nativeControlId={'test-id'} />);
  assert.equal(
    wrapper.find('.mdc-switch__native-control').props().id,
    'test-id'
  );
});

test('calls foundation.handleChange in NativeControl props.onChange', () => {
  const onChange = td.func() as React.ChangeEventHandler<HTMLInputElement>;
  const wrapper = mount<Switch>(<Switch onChange={onChange} />);
  const nativeControl = wrapper.find('.mdc-switch__native-control');
  const mockEvt = coerceForTesting<React.ChangeEvent<HTMLInputElement>>({
    target: {
      checked: true,
    },
    nativeEvent: {
      target: {
        checked: true,
      },
    },
  });
  wrapper.instance().foundation.handleChange = td.func<(evt: Event) => null>();
  nativeControl.props().onChange!(mockEvt);
  td.verify(wrapper.instance().foundation.handleChange(mockEvt.nativeEvent), {
    times: 1,
  });
});
