import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeControl from '../../../packages/select/NativeControl';

suite('Select Native Input');

const testEvt = {test: 'test', clientX: 20, target: {
  getBoundingClientRect: () => ({left: 15}),
  value: 'value',
}};

test('has mdc-select__native-control class', () => {
  const wrapper = shallow(<NativeControl/>);
  assert.isTrue(wrapper.hasClass('mdc-select__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<NativeControl className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('calls props.handleDisabled if props.disabled updates', () => {
  const handleDisabled = td.func();
  const wrapper = shallow(<NativeControl handleDisabled={handleDisabled} />);
  wrapper.setProps({disabled: true});
  td.verify(handleDisabled(true), {times: 1});
});

test('calls props.onChange if props.value updates', () => {
  const onChange = td.func();
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  const value = 'orange-peel';
  wrapper.setProps({value});
  td.verify(onChange({target: {value}}), {times: 1});
});

test('#event.focus calls #foundation.handleFocus', () => {
  const foundation = {handleFocus: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.simulate('focus', testEvt);
  td.verify(foundation.handleFocus(testEvt), {times: 1});
});

test('#event.focus calls #props.onFocus', () => {
  const onFocus = td.func();
  const wrapper = shallow(<NativeControl onFocus={onFocus} />);
  wrapper.simulate('focus', testEvt);
  td.verify(onFocus(testEvt), {times: 1});
});

test('#event.blur calls #foundation.handleBlur', () => {
  const foundation = {handleBlur: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.simulate('blur', testEvt);
  td.verify(foundation.handleBlur(testEvt), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = td.func();
  const wrapper = shallow(<NativeControl onBlur={onBlur} />);
  wrapper.simulate('blur', testEvt);
  td.verify(onBlur(testEvt), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = td.func();
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  wrapper.simulate('change', testEvt);
  td.verify(onChange(testEvt), {times: 1});
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = td.func();
  const wrapper = shallow(<NativeControl onMouseDown={onMouseDown} />);
  wrapper.simulate('mousedown', testEvt);
  td.verify(onMouseDown(testEvt), {times: 1});
});

test('#event.mousedown calls #props.setRippleCenter', () => {
  const setRippleCenter = td.func();
  const wrapper = shallow(<NativeControl setRippleCenter={setRippleCenter} />);
  wrapper.simulate('mousedown', testEvt);
  const left = testEvt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(testEvt.clientX - left), {times: 1});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = td.func();
  const wrapper = shallow(<NativeControl onTouchStart={onTouchStart} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  };
  wrapper.simulate('touchstart', evt);
  td.verify(onTouchStart(evt), {times: 1});
});

test('#event.touchstart calls #props.setRippleCenter', () => {
  const setRippleCenter = td.func();
  const wrapper = shallow(<NativeControl setRippleCenter={setRippleCenter} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  };
  wrapper.simulate('touchstart', evt);
  const left = evt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(20 - left), {times: 1});
});

test('renders children', () => {
  const wrapper = shallow(<NativeControl>
    <option value='test'>test</option>
  </NativeControl>);
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});
