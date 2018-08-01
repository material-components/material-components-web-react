import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import TextField, {HelperText, Input} from '../../../packages/text-field/index';

suite('Text Field');

test('classNames adds classes', () => {
  const wrapper = mount(<TextField
    label='my label'
    className='test-class-name'>
    <Input />
  </TextField>);
  const textField = wrapper.find('.mdc-text-field');
  assert.equal(textField.length, 1);
  assert.isTrue(textField.hasClass('test-class-name'));
});

test('classNames get outlined class when prop.outlined is true', () => {
  const wrapper = mount(<TextField label='my label' outlined><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--outlined');
  assert.equal(textField.length, 1);
});

test('classNames get outlinetextaread class when prop.textarea is true', () => {
  const wrapper = mount(<TextField label='my label' textarea><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--textarea');
  assert.equal(textField.length, 1);
});

test('classNames get fullwidth class when prop.fullWidth is true', () => {
  const wrapper = mount(<TextField label='my label' fullWidth><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--fullwidth');
  assert.equal(textField.length, 1);
});

test('classNames get disabled class when prop.disabled is true on the input', () => {
  const wrapper = mount(<TextField label='my label'><Input disabled /></TextField>);
  const textField = wrapper.find('.mdc-text-field--disabled');
  assert.equal(textField.length, 1);
});

test('classNames get trailingIcon class when prop.trailingIcon is passed an icon element', () => {
  const wrapper = mount(<TextField label='my label' trailingIcon={<i />}><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--with-trailing-icon');
  assert.equal(textField.length, 1);
});

test('classNames get leadingIcon class when prop.leadingIcon is passed an icon element', () => {
  const wrapper = mount(<TextField label='my label' leadingIcon={<i />}><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--with-leading-icon');
  assert.equal(textField.length, 1);
});

test('classNames get box class when prop.box is true', () => {
  const wrapper = mount(<TextField label='my label' box><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--box');
  assert.equal(textField.length, 1);
});

test('classNames get dense class when prop.dense is true', () => {
  const wrapper = mount(<TextField label='my label' dense><Input /></TextField>);
  const textField = wrapper.find('.mdc-text-field--dense');
  assert.equal(textField.length, 1);
});

test('#componentDidMount creates foundation', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentDidUpdate calls setValue if state.value updates', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.setValue = td.func();
  wrapper.setState({value: 'value'});
  td.verify(wrapper.instance().foundation_.setValue('value'), {times: 1});
});

test('#componentDidUpdate does not call setValue if another property updates', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.setValue = td.func();
  wrapper.setState({dir: 'rtl'});
  td.verify(wrapper.instance().foundation_.setValue(td.matchers.isA(String)), {times: 0});
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class-name'));
});

test('#adapter.isFocused returns true if wrapped in an rtl element', () => {
  const wrapper = mount(<TextField label='my label'><Input /></TextField>);
  wrapper.setState({isFocused: true});
  assert.isTrue(wrapper.instance().foundation_.adapter_.isFocused());
});

test('#adapter.isRtl returns true if the direction is true', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.style.direction = 'rtl';
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(
    <TextField label='my label'><Input /></TextField>, options);
  assert.isTrue(wrapper.instance().foundation_.adapter_.isRtl());
  document.body.style.direction = 'initial';
  div.remove();
});

test('#adapter.input.getNativeInput.validity.badInput return false for valid input', () => {
  const wrapper = mount(<TextField label='my label'><Input /></TextField>);
  const badInput = wrapper.instance().foundation_.adapter_.getNativeInput().validity.badInput;
  assert.isFalse(badInput);
});

test('#adapter.input.getNativeInput.validity.valid returns true for valid input', () => {
  const wrapper = mount(<TextField label='my label'><Input /></TextField>);
  const valid = wrapper.instance().foundation_.adapter_.getNativeInput().validity.valid;
  assert.isTrue(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns false for invalid input', () => {
  const wrapper = mount(<TextField label='my label'><Input value='123' pattern='[a-z]'/></TextField>);
  const valid = wrapper.instance().foundation_.adapter_.getNativeInput().validity.valid;
  assert.isFalse(valid);
});

test('#get adapter.input.value returns state.value', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.setState({value: '123'});
  const value = wrapper.instance().foundation_.adapter_.getNativeInput().value;
  assert.equal(value, '123');
});

test('#adapter.label.shakeLabel calls floatingLabelElement shake', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().floatingLabelElement = td.object({
    current: td.object({
      shake: td.func(),
    }),
  });

  wrapper.instance().foundation_.adapter_.shakeLabel(true);
  td.verify(wrapper.instance().floatingLabelElement.current.shake(), {times: 1});
});

test('#adapter.label.shakeLabel does not call floatingLabelElement shake if false is passed', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().floatingLabelElement = td.object({
    current: td.object({
      shake: td.func(),
    }),
  });

  wrapper.instance().foundation_.adapter_.shakeLabel(false);
  td.verify(wrapper.instance().floatingLabelElement.current.shake(), {times: 0});
});

test('#adapter.label.floatLabel updates state.labelIsFloated to true', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.label.floatLabel updates state.labelIsFloated to false', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.setState({labelIsFloated: true});
  wrapper.instance().foundation_.adapter_.floatLabel(false);
  assert.isFalse(wrapper.state().labelIsFloated);
});

test('#adapter.label.hasLabel returns true if label exists', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasLabel());
});

test('#adapter.label.hasLabel returns true if label exists', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const options = {attachTo: div};
  const wrapper = mount(
    <TextField label='my label'><Input /></TextField>, options);
  assert.equal(wrapper.instance().foundation_.adapter_.getLabelWidth(), 56);
  div.remove();
});

test('#adapter.lineRipple.activeLineRipple sets state.activeLineRipple to true', () => {
  const wrapper = shallow(
    <TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.activateLineRipple();
  assert.isTrue(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.deactivateLineRipple sets state.activeLineRipple to false', () => {
  const wrapper = shallow(
    <TextField label='my label'><Input /></TextField>);
  wrapper.setState({activateLineRipple: true});
  wrapper.instance().foundation_.adapter_.deactivateLineRipple();
  assert.isFalse(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.setLineRippleTransformOrigin sets state.lineRippleCenter', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.setLineRippleTransformOrigin(123);
  assert.equal(wrapper.state().lineRippleCenter, 123);
});

test('#adapter.notchedOutline.notchOutline sets state.outlineIsNotched to true', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.notchOutline();
  assert.isTrue(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.closeOutline sets state.outlineIsNotched to false', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.adapter_.closeOutline();
  assert.isFalse(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.hasOutline returns true if props.outlined is set', () => {
  const wrapper = shallow(<TextField label='my label' outlined><Input /></TextField>);
  const hasOutline = wrapper.instance().foundation_.adapter_.hasOutline();
  assert.isTrue(hasOutline);
});

test('#adapter.helperText.showToScreenReader toggles state.showHelperTextToScreenReader', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.helperText_.showToScreenReader();
  assert.isTrue(wrapper.state().showHelperTextToScreenReader);
});

test('#adapter.helperText.setValidity sets isValid to true', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.helperText_.setValidity(true);
  assert.isTrue(wrapper.state().isValid);
});

test('#events.onClick triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.handleTextFieldInteraction = td.func();
  wrapper.simulate('click');
  td.verify(wrapper.instance().foundation_.handleTextFieldInteraction(), {times: 1});
});

test('#events.onKeyDown triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().foundation_.handleTextFieldInteraction = td.func();
  wrapper.simulate('keyDown');
  td.verify(wrapper.instance().foundation_.handleTextFieldInteraction(), {times: 1});
});

test('renders leadingIcon if passed as prop', () => {
  const wrapper = shallow(<TextField label='my label'
      leadingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>);
  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});

test('renders trailingIcon if passed as prop', () => {
  const wrapper = shallow(<TextField label='my label'
      trailingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>);
  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});

test('does not render trailingIcon or trailingIcon if no prop is passed', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  assert.equal(wrapper.find('.test-class-name-icon').length, 0);
});

test('renders label if label is passed as prop', () => {
  const wrapper = mount(<TextField label='my label'><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-floating-label').length, 1);
});

test('does not render label if fullWidth is passed as prop', () => {
  const wrapper = mount(<TextField label='my label' fullWidth><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-floating-label').length, 0);
});

test('renders notchedOutline if notchedOutline prop is passed', () => {
  const wrapper = mount(<TextField label='my label' outlined><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-notched-outline').length, 1);
});

test('renders line ripple', () => {
  const wrapper = mount(<TextField label='my label'><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-line-ripple').length, 1);
});

test('does not render line ripple if outlined variant', () => {
  const wrapper = mount(<TextField label='my label' outlined><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('does not render line ripple if textarea variant', () => {
  const wrapper = mount(<TextField label='my label' textarea><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('does not render line ripple if fullWidth variant', () => {
  const wrapper = mount(<TextField label='my label' fullWidth><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('renders helperText if helperText prop is passed', () => {
  const helperText = <HelperText>my helper text</HelperText>;
  const wrapper = mount(<TextField label='my label' helperText={helperText}><Input /></TextField>);
  assert.equal(wrapper.find('.mdc-text-field-helper-text').length, 1);
  assert.equal(wrapper.find('.mdc-text-field').length, 1);
});

test('#inputProps.handleFocusChange updates state.isFocused', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().inputProps({}).handleFocusChange(true);
  assert.isTrue(wrapper.state().isFocused);
});

test('#inputProps.handleValueChange updates state.value', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().inputProps({}).handleValueChange('meow');
  assert.equal(wrapper.state().value, 'meow');
});

test('#inputProps.setDisabled updates state.disabled', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().inputProps({}).setDisabled(true);
  assert.isTrue(wrapper.state().disabled);
});

test('#inputProps.setInputId updates state.disabled', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  wrapper.instance().inputProps({}).setInputId('my-id');
  assert.equal(wrapper.state().inputId, 'my-id');
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<TextField label='my label'><Input /></TextField>);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
