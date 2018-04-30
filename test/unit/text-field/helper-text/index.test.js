import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import HelperText from '../../../../packages/text-field/helper-text';

suite.only('Text Field Helper Text');

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

test('#componentWillReceiveProps calls #foundation.showToScreenReader if ' +
  'props.showToScreenReader updates', () => {
  const wrapper = shallow(<HelperText />);
  wrapper.instance().foundation_.showToScreenReader = td.func();
  wrapper.setProps({showToScreenReader: true});
  td.verify(wrapper.instance().foundation_.showToScreenReader, {times: 1});
});



test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<HelperText />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
