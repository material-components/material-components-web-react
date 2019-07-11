import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import HelperText from '../../../../packages/text-field/helper-text/index';

suite('Text Field Helper Text');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <HelperText className='test-class-name'>Helper</HelperText>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field-helper-text'));
});

test('adds text to children', () => {
  const wrapper = shallow(<HelperText>Helper</HelperText>);
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
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  assert.exists(wrapper.instance().foundation);
});

test('#componentDidMount calls setValidation to true if isValidationMessage is set', () => {
  const wrapper = shallow<HelperText>(
    <HelperText isValidationMessage>Helper Text</HelperText>
  );
  assert.isTrue(
    wrapper.state().classList.has('mdc-text-field-helper-text--validation-msg')
  );
});

test('initially sets aria-hidden correctly', () => {
  const wrapper = shallow<HelperText>(
    <HelperText aria-hidden>Helper Text</HelperText>
  );
  assert.isTrue(wrapper.state()['aria-hidden']);
});

test('initially sets role correctly', () => {
  const wrapper = shallow<HelperText>(
    <HelperText role='button'>Helper Text</HelperText>
  );
  assert.equal(wrapper.state()['role'], 'button');
});

test('initially removes aria-hidden if showToScreenReader is true', () => {
  const wrapper = shallow<HelperText>(
    <HelperText aria-hidden showToScreenReader>
      Helper Text
    </HelperText>
  );
  assert.equal(wrapper.state()['aria-hidden'], undefined);
});

test('sets validity to false if props.isValid is initially false', () => {
  const wrapper = shallow<HelperText>(
    <HelperText role='button' isValid={false}>
      Helper Text
    </HelperText>
  );
  assert.equal(wrapper.state().role, undefined);
});
test(
  '#componentDidUpdate calls #foundation.showToScreenReader if ' +
    'props.showToScreenReader updates',
  () => {
    const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
    wrapper.instance().foundation.showToScreenReader = td.func<() => void>();
    wrapper.setProps({showToScreenReader: true});
    td.verify(wrapper.instance().foundation.showToScreenReader(), {
      times: 1,
    });
  }
);
test(
  '#componentDidUpdate calls #foundation.setValidity if ' +
    'props.isValid updates',
  () => {
    const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
    wrapper.instance().foundation.setValidity = td.func<
      (isValidity: boolean) => void
    >();
    wrapper.setProps({isValid: false});
    td.verify(wrapper.instance().foundation.setValidity(false), {times: 1});
  }
);

test('#componentDidUpdate calls setValidation to true if props.isValidationMessage updates', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  wrapper.instance().foundation.setValidation = td.func<
    (isValidation: boolean) => void
  >();
  wrapper.setProps({isValidationMessage: true});
  td.verify(wrapper.instance().foundation.setValidation(true), {times: 1});
});
test(
  '#componentDidUpdate neither calls #showToScreenReader nor ' +
    'setValidity if another prop updates',
  () => {
    const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
    wrapper.instance().foundation.showToScreenReader = td.func<() => void>();
    wrapper.instance().foundation.setValidity = td.func<
      (isValidity: boolean) => void
    >();
    wrapper.instance().foundation.setValidation = td.func<
      (isValidation: boolean) => void
    >();
    wrapper.setProps({persistent: true});
    td.verify(wrapper.instance().foundation.showToScreenReader(), {times: 0});
    td.verify(
      wrapper.instance().foundation.setValidity(td.matchers.isA(Boolean)),
      {times: 0}
    );
    td.verify(
      wrapper.instance().foundation.setValidation(td.matchers.isA(Boolean)),
      {times: 0}
    );
  }
);

test('#adapter.addClass updates state.classList', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  wrapper.instance().adapter.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass updates state.classList', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  const classList = new Set<string>();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().adapter.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass', () => {
  const wrapper = shallow<HelperText>(
    <HelperText className='test-class-name'>Helper Text</HelperText>
  );
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.setAttr sets role', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  wrapper.instance().adapter.setAttr('role', 'button');
  assert.equal(wrapper.state().role, 'button');
});

test('#adapter.setAttr sets aria-hidden', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  const value = String(true);
  wrapper.instance().adapter.setAttr('aria-hidden', value);
  assert.equal(String(wrapper.state()['aria-hidden']), value);
});

test('#adapter.removeAttr sets role to null', () => {
  const wrapper = shallow<HelperText>(
    <HelperText aria-hidden={false}>Helper Text</HelperText>
  );
  wrapper.instance().adapter.removeAttr('aria-hidden');
  assert.equal(wrapper.state()['aria-hidden'], null);
});

test('#adapter.removeAttr sets aria-hidden to null', () => {
  const wrapper = shallow<HelperText>(
    <HelperText role='button'>Helper Text</HelperText>
  );
  wrapper.instance().adapter.removeAttr('role');
  assert.equal(wrapper.state().role, null);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  const foundation = wrapper.instance().foundation;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy());
});

test(`MDC React doesn't need to implement this`, () => {
  const wrapper = shallow<HelperText>(<HelperText>Helper Text</HelperText>);
  wrapper.instance().adapter.setContent('');
});
