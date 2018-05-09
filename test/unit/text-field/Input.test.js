import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import {Input} from '../../../packages/text-field';

suite('Text Field Input');

test('classNames adds classes', () => {
  const wrapper = shallow(<Input className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field__input'));
});

test('#isBadInput returns false if input is ok', () => {
  const wrapper = mount(<Input value='meow'/>);
  const isBadInput = wrapper.instance().isBadInput();
  assert.isFalse(isBadInput);
});

test('#isValid returns true if input is valid', () => {
  const wrapper = mount(<Input value='m' pattern='[a-z]'/>);
  const isValidInput = wrapper.instance().isValid();
  assert.isTrue(isValidInput);
});

test('#isValid returns false if input is invalid', () => {
  const wrapper = mount(<Input value='meow' pattern='[a-z]'/>);
  const isValidInput = wrapper.instance().isValid();
  assert.isFalse(isValidInput);
});

test('#componentDidMount should call props.handleValueChange', () => {
  const handleValueChange = td.func();
  shallow(<Input handleValueChange={handleValueChange} value='woof'/>);
  td.verify(handleValueChange('woof'), {times: 1});
});

test('#componentDidMount should call props.setInputId if props.id exists', () => {
  const setInputId = td.func();
  shallow(<Input setInputId={setInputId} id='best-id'/>);
  td.verify(setInputId('best-id'), {times: 1});
});

test('#componentDidMount should call props.disabled if props.disabled is true', () => {
  const setDisabled = td.func();
  shallow(<Input setDisabled={setDisabled} disabled />);
  td.verify(setDisabled(true), {times: 1});
});

test('#componentDidMount does not error if props.disabled is true and no setDisabled method is provided', () => {
  shallow(<Input disabled />);
});

test('#componentDidMount does not throw errow if props.id is passed', () => {
  shallow(<Input id='123-best-id' />);
});

test('#componentDidMount does not throw errow if validation attr is updated', () => {
  const wrapper = shallow(<Input />);
  wrapper.setProps({required: true});
});

test('#componentDidMount should not call any method if disabled and id do not exist', () => {
  const setDisabled = td.func();
  const setInputId = td.func();

  shallow(<Input
    setInputId={setInputId}
    setDisabled={setDisabled}
    disabled={false} />);
  td.verify(setInputId(td.matchers.isA(Boolean)), {times: 0});
  td.verify(setDisabled(td.matchers.isA(Boolean)), {times: 0});
});

test('#componentWillReceiveProps calls handleValidationAttributeMutation_ when ' +
  'a whitelisted attr updates', () => {
  const foundation = {handleValidationAttributeMutation_: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  wrapper.setProps({required: true});
  td.verify(foundation.handleValidationAttributeMutation_([{
    attributeName: 'pattern',
  }]), {times: 1});
});

test('#componentWillReceiveProps calls setDisabled and foundation.setDisabled when ' +
  'disabled changes to true', () => {
  const foundation = {setDisabled: td.func()};
  const setDisabled = td.func();
  const wrapper = shallow(<Input foundation={foundation} setDisabled={setDisabled} />);
  wrapper.setProps({disabled: true});
  td.verify(foundation.setDisabled(true), {times: 1});
  td.verify(setDisabled(true), {times: 1});
});

test('#componentWillReceiveProps calls setDisabled and foundation.setDisabled when ' +
  'disabled changes to false', () => {
  const foundation = {setDisabled: td.func()};
  const setDisabled = td.func();
  const wrapper = shallow(<Input disabled foundation={foundation} setDisabled={setDisabled} />);
  wrapper.setProps({disabled: false});
  td.verify(foundation.setDisabled(false), {times: 1});
  td.verify(setDisabled(false), {times: 1});
});

test('#componentWillReceiveProps calls setInputId if id updates', () => {
  const setInputId = td.func();
  const wrapper = shallow(<Input setInputId={setInputId} id='best-id'/>);
  wrapper.setProps({id: 'better-id'});
  td.verify(setInputId('better-id'), {times: 1});
});

test('#componentWillReceiveProps does nothing if an unrelated property is ' +
  'updated', () => {
  const setDisabled = td.func();
  const foundation = {
    handleValidationAttributeMutation_: td.func(),
    setDisabled: td.func(),
  };
  const setInputId = td.func();
  const wrapper = shallow(<Input
    setDisabled={setDisabled}
    foundation={foundation}
    setInputId={setInputId}
  />);
  wrapper.setProps({type: 'number'});

  td.verify(setDisabled(td.matchers.isA(Boolean)), {times: 0});
  td.verify(foundation.handleValidationAttributeMutation_(td.matchers.anything()), {times: 0});
  td.verify(foundation.setDisabled(td.matchers.isA(Boolean)), {times: 0});
  td.verify(setInputId(td.matchers.anything), {times: 0});
});

test('#event.onFocus calls props.handleFocusChange(true)', () => {
  const handleFocusChange = td.func();
  const wrapper = shallow(<Input handleFocusChange={handleFocusChange} />);
  wrapper.simulate('focus');
  td.verify(handleFocusChange(true), {times: 1});
});

test('#event.onFocus calls foundation.activateFocus()', () => {
  const foundation = {activateFocus: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  wrapper.simulate('focus');
  td.verify(foundation.activateFocus(), {times: 1});
});

test('#event.onFocus calls props.onFocus()', () => {
  const onFocus = td.func();
  const wrapper = shallow(<Input onFocus={onFocus} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('focus', event);
  td.verify(onFocus(event), {times: 1});
});

test('#event.onBlur calls props.handleFocusChange(false)', () => {
  const handleFocusChange = td.func();
  const wrapper = shallow(<Input handleFocusChange={handleFocusChange} />);
  wrapper.simulate('blur');
  td.verify(handleFocusChange(false), {times: 1});
});

test('#event.onBlur calls foundation.deactivateFocus()', () => {
  const foundation = {deactivateFocus: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  wrapper.simulate('blur');
  td.verify(foundation.deactivateFocus(), {times: 1});
});

test('#event.onBlur calls props.onBlur()', () => {
  const onBlur = td.func();
  const wrapper = shallow(<Input onBlur={onBlur} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('blur', event);
  td.verify(onBlur(event), {times: 1});
});

test('#event.onMouseDown calls foundation.setTransformOrigin()', () => {
  const foundation = {setTransformOrigin: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('mouseDown', event);
  td.verify(foundation.setTransformOrigin(event), {times: 1});
});

test('#event.onMouseDown calls props.onMouseDown()', () => {
  const onMouseDown = td.func();
  const wrapper = shallow(<Input onMouseDown={onMouseDown} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('mouseDown', event);
  td.verify(onMouseDown(event), {times: 1});
});

test('#event.onTouchStart calls foundation.setTransformOrigin()', () => {
  const foundation = {setTransformOrigin: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('touchStart', event);
  td.verify(foundation.setTransformOrigin(event), {times: 1});
});

test('#event.onTouchStart calls props.onTouchStart()', () => {
  const onTouchStart = td.func();
  const wrapper = shallow(<Input onTouchStart={onTouchStart} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('touchStart', event);
  td.verify(onTouchStart(event), {times: 1});
});

test('#event.onChange calls foundation.autoCompleteFocus()', () => {
  const foundation = {autoCompleteFocus: td.func()};
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {target: {value: 'apple'}};
  wrapper.simulate('change', event);
  td.verify(foundation.autoCompleteFocus(), {times: 1});
});

test('#event.onChange calls props.handleValueChange()', () => {
  const handleValueChange = td.func();
  const wrapper = shallow(<Input handleValueChange={handleValueChange} />);
  const event = {target: {value: 'apple'}};
  wrapper.simulate('change', event);
  td.verify(handleValueChange('apple'), {times: 1});
});

test('#event.onChange calls props.onChange()', () => {
  const onChange = td.func();
  const wrapper = shallow(<Input onChange={onChange} />);
  const event = {target: {value: 'apple'}};
  wrapper.simulate('change', event);
  td.verify(onChange(event), {times: 1});
});
