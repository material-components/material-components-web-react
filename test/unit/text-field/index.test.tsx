import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import TextField, {
  HelperText,
  Input,
} from '../../../packages/text-field';
import {coerceForTesting} from '../helpers/types';
import {InputProps} from '../../../packages/text-field/Input'; // eslint-disable-line no-unused-vars
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
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.exists(wrapper.state().foundation);
});

test('#componentDidUpdate does not call setValue if another property updates', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.setValue = td.func();
  wrapper.setState({dir: 'rtl'});
  td.verify(wrapper.state().foundation.setValue(td.matchers.isA(String)), {
    times: 0,
  });
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.state().foundation.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(
    wrapper.state().foundation.adapter_.hasClass('test-class-name')
  );
});

test('#adapter.isFocused returns true if state.isFocused updates to true', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({isFocused: true});
  assert.isTrue(wrapper.state().foundation.adapter_.isFocused());
});

test('#adapter.isRtl returns true props.isRtl if is true', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField isRtl label='my label'>
      <Input />
    </TextField>
  );
  assert.isTrue(wrapper.state().foundation.adapter_.isRtl());
});

test('#adapter.isRtl returns false props.isRtl if is false', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.isFalse(wrapper.state().foundation.adapter_.isRtl());
});

test('#adapter.input.getNativeInput.validity.valid returns false for invalid input with email pattern', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='123' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' />
    </TextField>
  );
  const valid = wrapper.state().foundation.adapter_.getNativeInput().validity
    .valid;
  assert.isFalse(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns false for required field with no value', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='' required />
    </TextField>
  );
  const valid = wrapper.state().foundation.adapter_.getNativeInput().validity
    .valid;
  assert.isFalse(valid);
});

test('#adapter.input.getNativeInput.validity.valid returns true for required field with value', () => {
  const wrapper = mount<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input value='value' required />
    </TextField>
  );
  const valid = wrapper.state().foundation.adapter_.getNativeInput().validity
    .valid;
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
  const valid = wrapper.state().foundation.adapter_.getNativeInput().validity
    .valid;
  assert.isTrue(valid);
});

test('#get adapter.input.value returns state.value', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({value: '123'});
  const value = wrapper.state().foundation.adapter_.getNativeInput().value;
  assert.equal(value, '123');
});

test('#adapter.label.shakeLabel calls floatingLabelElement shake', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().floatingLabelElement = td.object({
    current: td.object({
      shake: td.func(),
    }),
  }) as React.RefObject<FloatingLabel>;
  wrapper.state().foundation.adapter_.shakeLabel(true);
  td.verify(wrapper.instance().floatingLabelElement.current!.shake(), {
    times: 1,
  });
});

test('#adapter.label.shakeLabel does not call floatingLabelElement shake if false is passed', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.instance().floatingLabelElement = coerceForTesting<React.RefObject<FloatingLabel>>(td.object({
    current: td.object({
      shake: td.func(),
    }),
  }));
  wrapper.state().foundation.adapter_.shakeLabel(false);
  td.verify(wrapper.instance().floatingLabelElement.current!.shake(), {
    times: 0,
  });
});

test('#adapter.label.floatLabel updates state.labelIsFloated to true', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.floatLabel(true);
  assert.isTrue(wrapper.state().labelIsFloated);
});

test('#adapter.label.floatLabel updates state.labelIsFloated to false', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({labelIsFloated: true});
  wrapper.state().foundation.adapter_.floatLabel(false);
  assert.isFalse(wrapper.state().labelIsFloated);
});

test('#adapter.label.hasLabel returns true if label exists', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.isTrue(wrapper.state().foundation.adapter_.hasLabel());
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
  const labelElement = wrapper.instance().floatingLabelElement.current!.labelElement_;
  assert.equal(wrapper.state().foundation.adapter_.getLabelWidth(), labelElement.current!.offsetWidth);

  document.body.removeChild(div);
});

test('#adapter.label.getLabelWidth returns state.initialLabelWidth', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({initialLabelWidth: 88});
  assert.equal(wrapper.state().foundation.adapter_.getLabelWidth(), 88);
});

test('#adapter.lineRipple.activeLineRipple sets state.activeLineRipple to true', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.activateLineRipple();
  assert.isTrue(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.deactivateLineRipple sets state.activeLineRipple to false', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.setState({activeLineRipple: true});
  wrapper.state().foundation.adapter_.deactivateLineRipple();
  assert.isFalse(wrapper.state().activeLineRipple);
});

test('#adapter.lineRipple.setLineRippleTransformOrigin sets state.lineRippleCenter', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.setLineRippleTransformOrigin(123);
  assert.equal(wrapper.state().lineRippleCenter, 123);
});

test('#adapter.notchedOutline.notchOutline sets state.outlineIsNotched to true', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.notchOutline();
  assert.isTrue(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.notchOutline sets state.notchedLabelWidth', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.notchOutline(90);
  assert.equal(wrapper.state().notchedLabelWidth, 90);
});

test('#adapter.notchedOutline.closeOutline sets state.outlineIsNotched to false', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.adapter_.closeOutline();
  assert.isFalse(wrapper.state().outlineIsNotched);
});

test('#adapter.notchedOutline.hasOutline returns true if props.outlined is set', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label' outlined>
      <Input />
    </TextField>
  );
  const hasOutline = wrapper.state().foundation.adapter_.hasOutline();
  assert.isTrue(hasOutline);
});

test('#adapter.helperText.showToScreenReader toggles state.showHelperTextToScreenReader', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.helperText_.showToScreenReader();
  assert.isTrue(wrapper.state().showHelperTextToScreenReader);
});

test('#adapter.helperText.setValidity sets isValid to true', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.helperText_.setValidity(true);
  assert.isTrue(wrapper.state().isValid);
});

test('#events.onClick triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.handleTextFieldInteraction = td.func();
  wrapper.simulate('click');
  td.verify(wrapper.state().foundation.handleTextFieldInteraction(), {
    times: 1,
  });
});

test('#events.onKeyDown triggers #foundation.handleTextFieldInteraction', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper.state().foundation.handleTextFieldInteraction = td.func();
  wrapper.simulate('keyDown');
  td.verify(wrapper.state().foundation.handleTextFieldInteraction(), {
    times: 1,
  });
});

test('renders leadingIcon if passed as prop', () => {
  const wrapper = shallow(<TextField label='my label'
    leadingIcon={<i className='test-class-name-icon' />}
  ><Input /></TextField>);
  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});

test('does not render leadingIcon if no leadingIcon prop is passed', () => {
  const wrapper = shallow(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.test-class-name-icon').length, 0);
});

test('onLeadingIconSelect is passed to leadingIcon if passed as prop', () => {
  const onSelect = () => 'select';
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      onLeadingIconSelect={onSelect}
      leadingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>
  );

  const leadingIcon = wrapper.find('.test-class-name-icon').parent().props();
  assert.isFunction(leadingIcon.onSelect);
  assert.strictEqual(leadingIcon.onSelect, onSelect);
});

test('onLeadingIconSelect is not passed to leadingIcon if not passed as prop', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      leadingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>
  );

  const leadingIcon = wrapper.find('.test-class-name-icon').parent().props();
  assert.isNotFunction(leadingIcon.onSelect);
  assert.isUndefined(leadingIcon.onSelect);
});

test('renders trailingIcon if passed as prop', () => {
  const wrapper = shallow(<TextField label='my label'
    trailingIcon={<i className='test-class-name-icon' />}
  ><Input /></TextField>);

  assert.equal(wrapper.find('.test-class-name-icon').length, 1);
});


test('does not render trailingIcon if no trailingIcon prop is passed', () => {
  const wrapper = shallow(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  assert.equal(wrapper.find('.test-class-name-icon').length, 0);
});

test('onTrailingIconSelect is passed to trailingIcon if passed as prop', () => {
  const onSelect = () => 'select';
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      onTrailingIconSelect={onSelect}
      trailingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>
  );

  const trailingIcon = wrapper.find('.test-class-name-icon').parent().props();
  assert.isFunction(trailingIcon.onSelect);
  assert.strictEqual(trailingIcon.onSelect, onSelect);
});

test('onTrailingIconSelect is not passed to trailingIcon if not passed as prop', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField
      label='my label'
      trailingIcon={<i className='test-class-name-icon' />}
    ><Input /></TextField>
  );

  const trailingIcon = wrapper.find('.test-class-name-icon').parent().props();
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

test('does not render input if there is no foundation', () => {
  const wrapper = shallow(
    <TextField label='my label'>
      <Input />
    </TextField>,
    {disableLifecycleMethods: true}
  );
  assert.equal(wrapper.find(Input).length, 0);
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
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper
    .instance()
    .inputProps(coerceForTesting<React.ReactElement<InputProps<HTMLInputElement>>>({}))
    .handleFocusChange(true);
  assert.isTrue(wrapper.state().isFocused);
});

test('#inputProps.handleValueChange updates state.value', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper
    .instance()
    .inputProps(coerceForTesting<React.ReactElement<InputProps<HTMLInputElement>>>({}))
    .handleValueChange('meow', coerceForTesting<() => void>(td.func()));
  assert.equal(wrapper.state().value, 'meow');
});

test('#inputProps.handleValueChange calls cb after state is set', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const callback = td.func();
  wrapper
    .instance()
    .inputProps(coerceForTesting<React.ReactElement<InputProps<HTMLInputElement>>>({}))
    .handleValueChange('meow', coerceForTesting<() => void>(callback));
  td.verify(callback(), {times: 1});
});

test('#inputProps.setDisabled updates state.disabled', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper
    .instance()
    .inputProps(coerceForTesting<React.ReactElement<InputProps<HTMLInputElement>>>({}))
    .setDisabled(true);
  assert.isTrue(wrapper.state().disabled);
});

test('#inputProps.setInputId updates state.disabled', () => {
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  wrapper
    .instance()
    .inputProps(coerceForTesting<React.ReactElement<InputProps<HTMLInputElement>>>({}))
    .setInputId('my-id');
  assert.equal(wrapper.state().inputId, 'my-id');
});

test('passing a ref to the <Input /> should return the instance of the Input', () => {
  let inputInstance;
  const inputRef = (input: any) => inputInstance = input;
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
  const wrapper = shallow<TextField<HTMLInputElement>>(
    <TextField label='my label'>
      <Input />
    </TextField>
  );
  const foundation = wrapper.state().foundation;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});
