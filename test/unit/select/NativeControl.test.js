import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeControl from '../../../packages/select/NativeControl';

suite('Select Native Input');

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
  const evt = {test: 'test'};
  wrapper.simulate('focus', evt);
  td.verify(foundation.handleFocus(evt), {times: 1});
});

test('#event.focus calls #props.onFocus', () => {
  const onFocus = td.func();
  const wrapper = shallow(<NativeControl onFocus={onFocus} />);
  const evt = {test: 'test'};
  wrapper.simulate('focus', evt);
  td.verify(onFocus(evt), {times: 1});
});

test('#event.blur calls #foundation.handleBlur', () => {
  const foundation = {handleBlur: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  const evt = {test: 'test'};
  wrapper.simulate('blur', evt);
  td.verify(foundation.handleBlur(evt), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = td.func();
  const wrapper = shallow(<NativeControl onBlur={onBlur} />);
  const evt = {test: 'test'};
  wrapper.simulate('blur', evt);
  td.verify(onBlur(evt), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = td.func();
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  const value = 'value';
  const evt = {test: 'test', target: {value}};
  wrapper.simulate('change', evt);
  td.verify(onChange(evt), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = td.func();
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  const evt = {test: 'test', target: {value: 'value'}};
  wrapper.simulate('change', evt);
  td.verify(onChange(evt), {times: 1});
});

test('renders children', () => {
  const wrapper = shallow(<NativeControl>
    <option value='test'>test</option>
  </NativeControl>);
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});
