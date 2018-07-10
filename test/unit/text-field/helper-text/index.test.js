import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import HelperText from '../../../../packages/text-field/helper-text';

suite('Text Field Helper Text');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <HelperText className='test-class-name'>Helper</HelperText>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field-helper-text'));
});

test('adds text to children', () => {
  const wrapper = shallow(
    <HelperText>Helper</HelperText>);
  assert.equal(wrapper.text(), 'Helper');
});

test('adds persistent class if props.persistent is true', () => {
  const wrapper = shallow(<HelperText persistent>Helper</HelperText>);
  assert.isTrue(wrapper.hasClass('mdc-text-field-helper-text--persistent'));
});

test('adds validation class if props.validation is true', () => {
  const wrapper = shallow(<HelperText validation>Helper</HelperText>);
  assert.isTrue(wrapper.hasClass('mdc-text-field-helper-text--validation-msg'));
});

test('#componentDidMount creates foundation', () => {
  const wrapper = shallow(<HelperText />);
  assert.exists(wrapper.instance().foundation_);
});

test('#componentDidMount calls setValidation to true if isValidationMessage is set', () => {
  const wrapper = shallow(<HelperText isValidationMessage />);
  assert.isTrue(wrapper.state().classList.has('mdc-text-field-helper-text--validation-msg'));
});

test('initially sets aria-hidden correctly', () => {
  const wrapper = shallow(<HelperText aria-hidden />);
  assert.isTrue(wrapper.state()['aria-hidden']);
});

test('initially sets role correctly', () => {
  const wrapper = shallow(<HelperText role='button' />);
  assert.equal(wrapper.state()['role'], 'button');
});

test('initially removes aria-hidden if showToScreenReader is true', () => {
  const wrapper = shallow(<HelperText aria-hidden showToScreenReader/>);
  assert.equal(wrapper.state()['aria-hidden'], undefined);
});

test('sets validity to false if props.isValid is initially false', () => {
  const wrapper = shallow(<HelperText role='button' isValid={false} />);
  assert.equal(wrapper.state().role, undefined);
});

test('#componentDidUpdate calls #foundation.showToScreenReader if ' +
  'props.showToScreenReader updates', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.showToScreenReader = td.func();
  wrapper.setProps({showToScreenReader: true});
  td.verify(wrapper.instance().foundation_.showToScreenReader(true), {times: 1});
});

test('#componentDidUpdate calls #foundation.setValidity if ' +
  'props.isValid updates', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.setValidity = td.func();
  wrapper.setProps({isValid: false});
  td.verify(wrapper.instance().foundation_.setValidity(false), {times: 1});
});

test('#componentDidUpdate calls setValidation to true if props.isValidationMessage updates', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.setValidation = td.func();
  wrapper.setProps({isValidationMessage: true});
  td.verify(wrapper.instance().foundation_.setValidation(true), {times: 1});
});

test('#componentDidUpdate neither calls #showToScreenReader nor ' +
  'setValidity if another prop updates', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.showToScreenReader = td.func();
  wrapper.instance().foundation_.setValidity = td.func();
  wrapper.instance().foundation_.setValidation = td.func();
  wrapper.setProps({persistent: true});

  td.verify(wrapper.instance().foundation_.showToScreenReader(td.matchers.isA(Boolean)), {times: 0});
  td.verify(wrapper.instance().foundation_.setValidity(td.matchers.isA(Boolean)), {times: 0});
  td.verify(wrapper.instance().foundation_.setValidation(td.matchers.isA(Boolean)), {times: 0});
});

test('#adapter.addClass updates state.classList', () => {
  const wrapper = shallow(<HelperText/>);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass updates state.classList', () => {
  const wrapper = shallow(<HelperText/>);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass', () => {
  const wrapper = shallow(<HelperText className='test-class-name'/>);
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class-name'));
});

test('#adapter.setAttr sets role', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.adapter_.setAttr('role', 'button');
  assert.equal(wrapper.state().role, 'button');
});

test('#adapter.setAttr sets aria-hidden', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.adapter_.setAttr('aria-hidden', true);
  assert.equal(wrapper.state()['aria-hidden'], true);
});

test('#adapter.removeAttr sets role to null', () => {
  const wrapper = shallow(<HelperText aria-hidden={false} />);
  wrapper.instance().foundation_.adapter_.removeAttr('aria-hidden');
  assert.equal(wrapper.state()['aria-hidden'], null);
});

test('#adapter.removeAttr sets aria-hidden to null', () => {
  const wrapper = shallow(<HelperText role='button' />);
  wrapper.instance().foundation_.adapter_.removeAttr('role');
  assert.equal(wrapper.state().role, null);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<HelperText />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
