import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import TextField, {HelperText, Input} from '../../../packages/text-field';
import {coerceForTesting} from '../helpers/types';
/* eslint-disable */
import FloatingLabel from '../../../packages/floating-label';
/* eslint-enable */

suite('Text Field');

test('classNames adds classes', () => {
  const wrapper = mount(
    <TextField label='my label' className='test-class-name'>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field');
  assert.equal(textField.length, 1);
  assert.isTrue(textField.hasClass('test-class-name'));
});

test('classNames get outlined class when prop.outlined is true', () => {
  const wrapper = mount(
    <TextField label='my label' outlined>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--outlined');
  assert.equal(textField.length, 1);
});

test('classNames get outlinetextaread class when prop.textarea is true', () => {
  const wrapper = mount(
    <TextField label='my label' textarea>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--textarea');
  assert.equal(textField.length, 1);
});

test('classNames get fullwidth class when prop.fullWidth is true', () => {
  const wrapper = mount(
    <TextField label='my label' fullWidth>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--fullwidth');
  assert.equal(textField.length, 1);
});

test('classNames get disabled class when prop.disabled is true on the input', () => {
  const wrapper = mount(
    <TextField label='my label'>
      <Input disabled />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--disabled');
  assert.equal(textField.length, 1);
});

test('classNames get trailingIcon class when prop.trailingIcon is passed an icon element', () => {
  const wrapper = mount(
    <TextField label='my label' trailingIcon={<i />}>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--with-trailing-icon');
  assert.equal(textField.length, 1);
});

test('classNames get leadingIcon class when prop.leadingIcon is passed an icon element', () => {
  const wrapper = mount(
    <TextField label='my label' leadingIcon={<i />}>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--with-leading-icon');
  assert.equal(textField.length, 1);
});

test('classNames get dense class when prop.dense is true', () => {
  const wrapper = mount(
    <TextField label='my label' dense>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--dense');
  assert.equal(textField.length, 1);
});

test('classNames get noLabel class when prop.noLabel is true', () => {
  const wrapper = mount(
    <TextField label='my label' noLabel>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field--no-label');
  assert.equal(textField.length, 1);
});

test('style prop adds style attribute', () => {
  const wrapper = mount(
    <TextField label='my label' style={{backgroundColor: 'red'}}>
      <Input />
    </TextField>
  );
  const textField = wrapper.find('.mdc-text-field[style]');
  assert.equal(textField.length, 1);
});

test('#componentDidMount creates foundation', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.exists(wrapper.state().foundation);
});

test('#componentDidUpdate does not call setValue if another property updates', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation!.setValue = td.func<(value: string) => void>();
  wrapper.setState({dir: 'rtl'});
  td.verify(wrapper.state().foundation!.setValue(td.matchers.isA(String)), {
    times: 0,
  });
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const classList = new Set<string>();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().adapter.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const classList = new Set<string>();
  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.isFocused returns true if state.isFocused updates to true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({isFocused: true});
  assert.isTrue(wrapper.instance().adapter.isFocused());
});

test('#adapter.input.getNativeInput.validity.valid returns false for invalid input with email pattern', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='123' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' />
    </TextField>
  );
  const valid = wrapper.instance().adapter.getNativeInput()!.validity.valid;
  assert.isFalse(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns false for required field with no value', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='' required />
    </TextField>
  );
  const valid = wrapper.instance().adapter.getNativeInput()!.validity.valid;
  assert.isFalse(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns true for required field with value', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='value' required />
    </TextField>
  );
  const valid = wrapper.instance().adapter.getNativeInput()!.validity.valid;
  assert.isTrue(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns true for valid email', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input
        value='chevy@gmail.com'
        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      />
    </TextField>
  );
  const valid = wrapper.instance().adapter.getNativeInput()!.validity.valid;
  assert.isTrue(valid);
});

test('#get adapter.input.value returns input.props.value', () => {
  const value = 123;
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value={value} />
    </TextField>
  );
  assert.equal(
    value.toString(),
    wrapper.instance().adapter.getNativeInput()!.value
  );
});

test('#adapter.label.shakeLabel calls floatingLabelElement shake', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().floatingLabelElement = td.object({
    current: td.object({
      shake: td.func(),
    }),
  }) as React.RefObject<FloatingLabel>;
  wrapper.instance().adapter.shakeLabel(true);
  td.verify(wrapper.instance().floatingLabelElement.current!.shake(), {
    times: 1,
  });
});

test('#adapter.label.shakeLabel does not call floatingLabelElement shake if false is passed', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().floatingLabelElement = coerceForTesting<
    React.RefObject<FloatingLabel>
  >(
    td.object({
      current: td.object({
        shake: td.func(),
      }),
    })
  );
  wrapper.instance().adapter.shakeLabel(false);
  td.verify(wrapper.instance().floatingLabelElement.current!.shake(), {
    times: 0,
  });
});

test('#adapter.label.floatLabel updates state.labelIsFloated to true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.label.floatLabel updates state.labelIsFloated to false', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({labelIsFloated: true});
  wrapper.instance().adapter.floatLabel(false);
  assert.isFalse(wrapper.state().labelIsFloated);
});

test('#adapter.label.hasLabel returns true if label exists', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.isTrue(wrapper.instance().adapter.hasLabel());
});

test('#adapter.label.getLabelWidth returns offsetWidth of labelElement', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>,
    {attachTo: div}
  );
  const labelElement = wrapper.instance().floatingLabelElement.current!
    .labelElement;
  assert.equal(
    wrapper.instance().adapter.getLabelWidth(),
    labelElement.current!.offsetWidth
  );
  document.body.removeChild(div);
});

test('#adapter.label.getLabelWidth returns state.initialLabelWidth', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({initialLabelWidth: 88});
  assert.equal(wrapper.instance().adapter.getLabelWidth(), 88);
});

test('#adapter.lineRipple.activeLineRipple sets state.activeLineRipple to true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.activateLineRipple();
  assert.isTrue(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.deactivateLineRipple sets state.activeLineRipple to false', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({activeLineRipple: true});
  wrapper.instance().adapter.deactivateLineRipple();
  assert.isFalse(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.setLineRippleTransformOrigin sets state.lineRippleCenter', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.setLineRippleTransformOrigin(123);
  assert.equal(wrapper.state().lineRippleCenter, 123);
});

test('#adapter.notchedOutline.notchOutline sets state.outlineIsNotched to true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.notchOutline(0);
  assert.isTrue(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.notchOutline sets state.notchedLabelWidth', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.notchOutline(90);
  assert.equal(wrapper.state().notchedLabelWidth, 90);
});

test('#adapter.notchedOutline.closeOutline sets state.outlineIsNotched to false', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().adapter.closeOutline();
  assert.isFalse(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.hasOutline returns true if props.outlined is set', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label' outlined>
      <Input />
    </TextField>
  );
  const hasOutline = wrapper.instance().adapter.hasOutline();
  assert.isTrue(hasOutline);
});

test('#events.onClick triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const foundation = wrapper.state().foundation!;
  foundation.handleTextFieldInteraction = td.func<() => void>();
  wrapper.simulate('click');
  td.verify(foundation.handleTextFieldInteraction(), {
    times: 1,
  });
});

test('#events.onKeyDown triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const foundation = wrapper.state().foundation!;
  foundation.handleTextFieldInteraction = td.func<() => void>();
  wrapper.simulate('keyDown');
  td.verify(foundation.handleTextFieldInteraction(), {
    times: 1,
  });
});

test('renders leadingIcon if passed as prop', () => {
  const wrapper = mount(
    <TextField
      label='my label'
      leadingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});

test('does not render leadingIcon if no leadingIcon prop is passed', () => {
  const wrapper = mount(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.test-class-name-icon').length, 0);
});

test('onLeadingIconSelect is passed to leadingIcon if passed as prop', () => {
  const onSelect = () => 'select';
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      onLeadingIconSelect={onSelect}
      leadingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );

  const leadingIcon = wrapper
    .find('.test-class-name-icon')
    .parent()
    .props();
  assert.isFunction(leadingIcon.onSelect);
  assert.strictEqual(leadingIcon.onSelect, onSelect);
});

test('onLeadingIconSelect is not passed to leadingIcon if not passed as prop', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      leadingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );

  const leadingIcon = wrapper
    .find('.test-class-name-icon')
    .parent()
    .props();
  assert.isNotFunction(leadingIcon.onSelect);
  assert.isUndefined(leadingIcon.onSelect);
});

test('renders trailingIcon if passed as prop', () => {
  const wrapper = mount(
    <TextField
      label='my label'
      trailingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );

  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});

test('does not render trailingIcon if no trailingIcon prop is passed', () => {
  const wrapper = mount(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.test-class-name-icon').length, 0);
});

test('onTrailingIconSelect is passed to trailingIcon if passed as prop', () => {
  const onSelect = () => 'select';
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      onTrailingIconSelect={onSelect}
      trailingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );

  const trailingIcon = wrapper
    .find('.test-class-name-icon')
    .parent()
    .props();
  assert.isFunction(trailingIcon.onSelect);
  assert.strictEqual(trailingIcon.onSelect, onSelect);
});

test('onTrailingIconSelect is not passed to trailingIcon if not passed as prop', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      trailingIcon={<i className='test-class-name-icon' />}
    >
      <Input />
    </TextField>
  );

  const trailingIcon = wrapper
    .find('.test-class-name-icon')
    .parent()
    .props();
  assert.isNotFunction(trailingIcon.onSelect);
  assert.isUndefined(trailingIcon.onSelect);
});

test('renders label if label is passed as prop', () => {
  const wrapper = mount(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-floating-label').length, 1);
});

test('does not render label if fullWidth is passed as prop', () => {
  const wrapper = mount(
    <TextField label='my label' fullWidth>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-floating-label').length, 0);
});

test('renders notchedOutline if notchedOutline prop is passed', () => {
  const wrapper = mount(
    <TextField label='my label' outlined>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-notched-outline').length, 1);
});

test('renders line ripple', () => {
  const wrapper = mount(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-line-ripple').length, 1);
});

test('does not render line ripple if outlined variant', () => {
  const wrapper = mount(
    <TextField label='my label' outlined>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('does not render line ripple if textarea variant', () => {
  const wrapper = mount(
    <TextField label='my label' textarea>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('does not render line ripple if fullWidth variant', () => {
  const wrapper = mount(
    <TextField label='my label' fullWidth>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-line-ripple').length, 0);
});

test('renders helperText if helperText prop is passed', () => {
  const helperText = <HelperText>my helper text</HelperText>;
  const wrapper = mount(
    <TextField label='my label' helperText={helperText}>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.mdc-text-field-helper-text').length, 1);
  assert.equal(wrapper.find('.mdc-text-field').length, 1);
});

test('renders textarea if textarea variant', () => {
  const wrapper = mount(
    <TextField label='my label' textarea>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('textarea').length, 1);
});

test('renders input after foundation is created', () => {
  const wrapper = shallow(
    <TextField label='my label'>
      <Input />
    </TextField>,
    {disableLifecycleMethods: true}
  );
  wrapper.setState({foundation: {}});
  assert.equal(wrapper.find(Input).length, 1);
});

test('#inputProps.handleFocusChange updates state.isFocused', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().inputProps.handleFocusChange(true);
  assert.isTrue(wrapper.state().isFocused);
});

test('#inputProps.handleFocusChange calls foundation.activateFocus if isFocused is true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const activateFocus = td.func();
  const foundation = {activateFocus} as any;
  wrapper.setState({foundation});
  wrapper.instance().inputProps.handleFocusChange(true);
  td.verify(activateFocus(), {times: 1});
});

test('#inputProps.handleFocusChange calls foundation.deactivateFocus if isFocused is false', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const deactivateFocus = td.func();
  const foundation = {deactivateFocus} as any;
  wrapper.setState({foundation});
  wrapper.instance().inputProps.handleFocusChange(false);
  td.verify(deactivateFocus(), {times: 1});
});

test('#inputProps.setDisabled updates state.disabled', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().inputProps.setDisabled(true);
  assert.isTrue(wrapper.state().disabled);
});

test('#inputProps.setInputId updates state.disabled', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().inputProps.setInputId('my-id');
  assert.equal(wrapper.state().inputId, 'my-id');
});

test('passing a ref to the <Input /> should return the instance of the Input', () => {
  let inputInstance;
  const inputRef = (input: any) => (inputInstance = input);
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input ref={inputRef} />
    </TextField>
  );

  assert.equal(
    wrapper
      .childAt(0)
      .childAt(0)
      .instance(),
    inputInstance
  );
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const foundation = wrapper.state().foundation!;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.getNativeInput throws error when no inputComponent', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField>
      <Input />
    </TextField>
  );
  wrapper.instance().inputComponent_ = null;
  try {
    wrapper.instance().adapter.getNativeInput();
  } catch (e) {
    assert.equal(
      e.message,
      'MDCReactTextField: The input did not render properly'
    );
  }
});

test(`MDC React doesn't need to implement this`, () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField>
      <Input />
    </TextField>
  );
  const temp: any = {};
  wrapper.instance().adapter.registerTextFieldInteractionHandler(temp, temp);
  wrapper.instance().adapter.deregisterTextFieldInteractionHandler(temp, temp);
  wrapper.instance().adapter.registerValidationAttributeChangeHandler(temp);
  wrapper.instance().adapter.deregisterValidationAttributeChangeHandler(temp);
  wrapper.instance().adapter.registerInputInteractionHandler(temp, temp);
  wrapper.instance().adapter.deregisterInputInteractionHandler(temp, temp);
});

test('Input component sync test in TextField', () => {
  class TestComponent extends React.Component {
    state = {
      disabled: false,
    };
    render() {
      return (
        <TextField>
          <Input disabled={this.state.disabled} />
        </TextField>
      );
    }
  }
  const wrapper = mount<TestComponent>(<TestComponent />);
  // If inputComponent is null and disabled is true,
  // setDisabled called #inputAdapter.getNativeInput
  // and throw error because there is no inputComponent
  assert.doesNotThrow(() => wrapper.instance().setState({disabled: true}));
});

test('FloatingLabel is floated even if value is changed programmatically', () => {
  class TestComponent extends React.Component {
    state = {value: ''};
    render() {
      return (
        <TextField label='my label'>
          <Input value={this.state.value} />
        </TextField>
      );
    }
  }
  const wrapper = mount<TestComponent>(<TestComponent />);
  const label = wrapper.find('.mdc-floating-label').getDOMNode();
  const floatClass = 'mdc-floating-label--float-above';
  assert.isFalse(label.className.includes(floatClass));
  wrapper.setState({value: 'Test!'});
  assert.isTrue(label.className.includes(floatClass));
});
