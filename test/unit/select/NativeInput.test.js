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

test('calls props.handleValueChange with props.value onMount', () => {
  const handleValueChange = td.func();
  const value = 'test value';
  shallow(<NativeControl
    handleValueChange={handleValueChange}
    value={value}
  />);
  td.verify(handleValueChange(value), {times: 1});
});

test('calls props.setDisabled props.disabed', () => {
  const setDisabled = td.func();
  shallow(<NativeControl
    setDisabled={setDisabled}
    disabled
  />);
  td.verify(setDisabled(true), {times: 1});
});

test('calls props.setDisabled if props.disabled updates', () => {
  const setDisabled = td.func();
  const wrapper = shallow(<NativeControl setDisabled={setDisabled} />);
  wrapper.setProps({disabled: true});
  td.verify(setDisabled(true), {times: 1});
});

test('calls props.foundation.setDisabled if props.disabled updates', () => {
  const foundation = {setDisabled: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.setProps({disabled: true});
  td.verify(foundation.setDisabled(true), {times: 1});
});

test('calls props.handleValueChange if props.value updates', () => {
  const handleValueChange = td.func();
  const wrapper = shallow(<NativeControl handleValueChange={handleValueChange} />);
  const value = 'orange-peel';
  wrapper.setProps({value});
  td.verify(handleValueChange(value), {times: 1});
});

test('#event.focus calls #foundation.focusHandler_', () => {
  const foundation = {focusHandler_: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  const evt = {test: 'test'};
  wrapper.simulate('focus', evt);
  td.verify(foundation.focusHandler_(evt), {times: 1});
});

test('#event.focus calls #props.onFocus', () => {
  const onFocus = td.func();
  const wrapper = shallow(<NativeControl onFocus={onFocus} />);
  const evt = {test: 'test'};
  wrapper.simulate('focus', evt);
  td.verify(onFocus(evt), {times: 1});
});

test('#event.blur calls #foundation.blurHandler_', () => {
  const foundation = {blurHandler_: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  const evt = {test: 'test'};
  wrapper.simulate('blur', evt);
  td.verify(foundation.blurHandler_(evt), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = td.func();
  const wrapper = shallow(<NativeControl onBlur={onBlur} />);
  const evt = {test: 'test'};
  wrapper.simulate('blur', evt);
  td.verify(onBlur(evt), {times: 1});
});

test('#event.change calls #foundation.selectionHandler_', () => {
  const foundation = {selectionHandler_: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  const evt = {test: 'test', target: {value: 'value'}};
  wrapper.simulate('change', evt);
  td.verify(foundation.selectionHandler_(evt), {times: 1});
});

test('#event.change calls #props.handleValueChange', () => {
  const handleValueChange = td.func();
  const wrapper = shallow(<NativeControl handleValueChange={handleValueChange} />);
  const evt = {test: 'test', target: {value: 'value'}};
  wrapper.simulate('change', evt);
  td.verify(handleValueChange(evt.target.value), {times: 1});
});

test('#event.change calls #props.handleValueChange', () => {
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
