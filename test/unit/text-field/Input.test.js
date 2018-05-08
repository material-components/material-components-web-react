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

test('constructor calls props.setBadInputHandler()', () => {
  const setBadInputHandler = td.func();
  const wrapper = shallow(<Input setBadInputHandler={setBadInputHandler} />);
  td.verify(setBadInputHandler(td.matchers.isA(Function)), {times: 1});
});

test('#setBadInputHandler returns false if input is ok', () => {
  const wrapper = shallow(<Input />);

});

test('constructor calls props.setIsValidHandler()', () => {
  const setIsValidHandler = td.func();
  const wrapper = shallow(<Input setIsValidHandler={setIsValidHandler} />);
  td.verify(setIsValidHandler(td.matchers.isA(Function)), {times: 1});
});

test('#componentDidMount should call props.handleValueChange', () => {
  const handleValueChange = td.func();
  const wrapper = shallow(<Input handleValueChange={handleValueChange} value='woof'/>);
  td.verify(handleValueChange('woof'), {times: 1});
});

test('#componentDidMount should call props.setInputId if props.id exists', () => {
  const setInputId = td.func();
  const wrapper = shallow(<Input setInputId={setInputId} id='best-id'/>);
  td.verify(setInputId('best-id'), {times: 1});
});

test('#componentDidMount should call props.disabled if props.disabled is true', () => {
  const setDisabled = td.func();
  const wrapper = shallow(<Input setDisabled={setDisabled} disabled={true} />);
  td.verify(setDisabled(true), {times: 1});
});

test('#componentDidMount should not call any method if disabled and id do not exist', () => {
  const setDisabled = td.func();
  const setInputId = td.func();

  const wrapper = shallow(<Input
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
    attributeName: 'pattern'
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

test('#componentWillReceiveProps updates value if props.foundationValue updates', () => {
  const wrapper = shallow(<Input foundationValue='apple' />);
  wrapper.setProps({foundationValue: 'orange'});
  assert(wrapper.state().value, 'orange');
});

test('#componentWillReceiveProps updates value if props.value updates', () => {
  const wrapper = shallow(<Input value='apple' />);
  wrapper.setProps({value: 'orange'});
  assert(wrapper.state().value, 'orange');
});

test('#componentWillReceiveProps updates value to props.value if ' +
  'both props.value and props.foundationValue change simultaneously', () => {
  const wrapper = shallow(<Input foundationValue='apple' value='apple' />);
  wrapper.setProps({
    foundationValue: 'orange',
    value: 'lemon',
  });
  assert(wrapper.state().value, 'lemon');
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

test('#event.onFocus calls props.updateFocus(true)', () => {
  const updateFocus = td.func();
  const wrapper = shallow(<Input updateFocus={updateFocus} />);
  wrapper.simulate('focus');
  td.verify(updateFocus(true), {times: 1});
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

test('#event.onBlur calls props.updateFocus(false)', () => {
  const updateFocus = td.func();
  const wrapper = shallow(<Input updateFocus={updateFocus} />);
  wrapper.simulate('blur');
  td.verify(updateFocus(false), {times: 1});
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
