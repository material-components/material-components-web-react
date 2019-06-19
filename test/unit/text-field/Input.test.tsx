import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import {Input} from '../../../packages/text-field/index';

const noop: any = () => {};
const buildFoundation: any = (overrides: any = {}) => ({
  shouldFloat: false,
  shouldShake: false,
  init: noop,
  destroy: noop,
  handleTextFieldInteraction: noop,
  handleValidationAttributeChange: noop,
  notchOutline: noop,
  activateFocus: noop,
  setTransformOrigin: noop,
  handleInput: noop,
  autoCompleteFocus: noop,
  deactivateFocus: noop,
  getValue: noop,
  setValue: noop,
  isValid: noop,
  setValid: noop,
  setUseNativeValidation: noop,
  isDisabled: noop,
  setDisabled: noop,
  setHelperTextContent: noop,
  setLeadingIconAriaLabel: noop,
  setLeadingIconContent: noop,
  setTrailingIconAriaLabel: noop,
  setTrailingIconContent: noop,
  ...overrides,
});

suite('Text Field Input');

test('classNames adds classes', () => {
  const wrapper = shallow(<Input className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-text-field__input'));
});

test('value test for string', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input value={'hello world'} />
  );
  assert.equal(wrapper.instance().getValue(), 'hello world');
});

test('value test for number', () => {
  const wrapper = mount<Input<HTMLInputElement>>(<Input value={123} />);
  assert.equal(wrapper.instance().getValue(), '123');
});

test('value test for string array', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input value={['hello', 'world']} />
  );
  assert.equal(wrapper.instance().getValue(), 'helloworld');
});

test('return -1 when maxLength does not define', () => {
  const wrapper = mount<Input<HTMLInputElement>>(<Input />);
  assert.equal(wrapper.instance().getMaxLength(), -1);
});

test('getMaxLength returns defined maxLength', () => {
  const wrapper = mount<Input<HTMLInputElement>>(<Input maxLength={15} />);
  assert.equal(wrapper.instance().getMaxLength(), 15);
});

test('default inputType is "input"', () => {
  const wrapper = shallow(<Input />);
  assert.equal(wrapper.type(), 'input');
});

test('inputType is "textarea"', () => {
  const wrapper = shallow(<Input inputType='textarea' />);
  assert.equal(wrapper.type(), 'textarea');
});

test('#isBadInput returns false if input is ok', () => {
  const wrapper = mount<Input<HTMLInputElement>>(<Input value='meow' />);
  const isBadInput = wrapper.instance().isBadInput();
  assert.isFalse(isBadInput);
});

test('#isValid returns true if input is valid', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input value='m' pattern='[a-z]' />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isTrue(isValidInput);
});

test('#isValid returns false if input is invalid', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input value='meow' pattern='[a-z]' />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isFalse(isValidInput);
});

test('#isValid returns true if prop.isValid is set to true', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input foundation={buildFoundation()} value='m' pattern='[a-z]' isValid />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isTrue(isValidInput);
});

test('#isValid returns false if prop.isValid is set to false', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input
      foundation={buildFoundation()}
      value='m'
      pattern='[a-z]'
      isValid={false}
    />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isFalse(isValidInput);
});

test('#isValid returns false if prop.isValid is set to false and input is invalid', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input
      foundation={buildFoundation()}
      value='meow'
      pattern='[a-z]'
      isValid={false}
    />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isFalse(isValidInput);
});

test('#isValid returns true if prop.isValid is set to true and input is invalid', () => {
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input
      foundation={buildFoundation()}
      value='meow'
      pattern='[a-z]'
      isValid
    />
  );
  const isValidInput = wrapper.instance().isValid();
  assert.isTrue(isValidInput);
});

test('#componentDidMount should call props.setInputId if props.id exists', () => {
  const setInputId = td.func();
  const props: any = {setInputId};
  shallow<Input<HTMLInputElement>>(<Input {...props} id='best-id' />);
  td.verify(setInputId('best-id'), {times: 1});
});

test('#componentDidMount should call props.disabled if props.disabled is true', () => {
  const setDisabled = td.func();
  const props: any = {setDisabled};
  shallow<Input<HTMLInputElement>>(<Input {...props} disabled />);
  td.verify(setDisabled(true), {times: 1});
});

test('#componentDidMount does not error if props.disabled is true and no setDisabled method is provided', () => {
  shallow(<Input disabled />);
});

test('#componentDidMount does not throw errow if props.id is passed', () => {
  shallow(<Input id='123-best-id' />);
});

test('#componentDidMount should not call any method if disabled and id do not exist', () => {
  const setDisabled = td.func();
  const setInputId = td.func();
  const props: any = {setDisabled, setInputId};
  shallow(<Input {...props} disabled={false} />);
  td.verify(setInputId(td.matchers.isA(Boolean)), {times: 0});
  td.verify(setDisabled(td.matchers.isA(Boolean)), {times: 0});
});

test(
  '#props.handleFocusChange is called when props.autoFocus is true' +
    ', there is a props.foundation, and component has mounted',
  () => {
    const handleFocusChange = td.func();
    const props: any = {handleFocusChange, autoFocus: true, foundation: {}};
    mount(<Input {...props} />);
    td.verify(handleFocusChange(true), {times: 1});
  }
);

test(
  '#props.handleFocusChange is not called when props.autoFocus is undefined' +
    ', there is a props.foundation, and component has mounted',
  () => {
    const handleFocusChange = td.func();
    const props: any = {handleFocusChange, foundation: {}};
    mount(<Input {...props} />);
    td.verify(handleFocusChange(td.matchers.isA(Boolean)), {times: 0});
  }
);

test(
  '#props.handleFocusChange is not called when props.autoFocus is true' +
    ', there is no props.foundation, and component has mounted',
  () => {
    const handleFocusChange = td.func();
    const props: any = {handleFocusChange, autoFocus: true};
    mount(<Input {...props} />);
    td.verify(handleFocusChange(td.matchers.isA(Boolean)), {times: 0});
  }
);

test('change to minLength calls handleValidationAttributeChange', () => {
  const foundation: any = buildFoundation({
    handleValidationAttributeChange: td.func(),
  });
  const wrapper = shallow(<Input foundation={foundation} />);
  wrapper.setProps({minLength: 20});
  td.verify(foundation.handleValidationAttributeChange(['minlength']), {
    times: 1,
  });
});

test(
  '#componentDidUpdate calls handleValidationAttributeChange when ' +
    'a whitelisted attr updates',
  () => {
    const foundation: any = buildFoundation({
      handleValidationAttributeChange: td.func(),
    });
    const wrapper = shallow(<Input foundation={foundation} />);
    wrapper.setProps({required: true});
    td.verify(foundation.handleValidationAttributeChange(['required']), {
      times: 1,
    });
  }
);

test(
  '#componentDidUpdate calls setDisabled and foundation.setDisabled when ' +
    'disabled changes to true',
  () => {
    const foundation: any = buildFoundation({setDisabled: td.func()});
    const setDisabled = td.func();
    const props: any = {setDisabled, foundation};
    const wrapper = shallow(<Input {...props} />);
    wrapper.setProps({disabled: true});
    td.verify(foundation.setDisabled(true), {times: 1});
    td.verify(setDisabled(true), {times: 1});
  }
);

test(
  '#componentDidUpdate calls setDisabled and foundation.setDisabled when ' +
    'disabled changes to false',
  () => {
    const foundation: any = buildFoundation({setDisabled: td.func()});
    const setDisabled = td.func();
    const props: any = {setDisabled, foundation};
    const wrapper = shallow(<Input disabled {...props} />);

    wrapper.setProps({disabled: false});
    td.verify(foundation.setDisabled(false), {times: 1});
    td.verify(setDisabled(false), {times: 1});
  }
);

test('#componentDidUpdate calls setInputId if id updates', () => {
  const setInputId = td.func();
  const props: any = {setInputId};
  const wrapper = shallow(<Input {...props} id='best-id' />);
  wrapper.setProps({id: 'better-id'});
  td.verify(setInputId('better-id'), {times: 1});
});

test(
  '#componentDidUpdate does nothing if an unrelated property is ' + 'updated',
  () => {
    const setDisabled = td.func();
    const foundation: any = buildFoundation({
      handleValidationAttributeMutation_: td.func(),
      setDisabled: td.func(),
    });
    const setInputId = td.func();
    const props: any = {setInputId, foundation, setDisabled};

    const wrapper = shallow(<Input {...props} />);
    wrapper.setProps({type: 'number'});
    td.verify(setDisabled(td.matchers.isA(Boolean)), {times: 0});
    td.verify(
      foundation.handleValidationAttributeMutation_(td.matchers.anything()),
      {times: 0}
    );
    td.verify(foundation.setDisabled(td.matchers.isA(Boolean)), {times: 0});
    td.verify(setInputId(td.matchers.anything), {times: 0});
  }
);

test('#componentDidUpdate calls setUseNativeValidation when isValid changes to undefined', () => {
  const foundation: any = buildFoundation({setUseNativeValidation: td.func()});
  const wrapper = shallow(
    <Input isValid={false} value='test value' foundation={foundation} />
  );
  wrapper.setProps({isValid: undefined});
  td.verify(foundation.setUseNativeValidation(false), {times: 1});
});

test('#componentDidUpdate calls setUseNativeValidation when isValid changes', () => {
  const foundation: any = buildFoundation({setUseNativeValidation: td.func()});
  const wrapper = shallow(<Input value='test value' foundation={foundation} />);
  wrapper.setProps({isValid: true});
  td.verify(foundation.setUseNativeValidation(false), {times: 1});
});

test('#componentDidUpdate calls setValid when isValid changes', () => {
  const foundation: any = buildFoundation({setValid: td.func()});
  const wrapper = shallow(
    <Input isValid={false} value='test value' foundation={foundation} />
  );
  wrapper.setProps({isValid: true});
  td.verify(foundation.setValid(false), {times: 1});
  td.verify(foundation.setValid(true), {times: 1});
});

test('foundation.setValue() is called if this.props.value updates', () => {
  const foundation: any = buildFoundation({setValue: td.func()});
  const wrapper = shallow(<Input value='test value' foundation={foundation} />);
  wrapper.setProps({value: 'meow'});
  td.verify(foundation.setValue('meow'), {times: 1});
});

test('#event.onFocus calls props.handleFocusChange(true)', () => {
  const handleFocusChange = td.func();
  const props: any = {handleFocusChange, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  wrapper.simulate('focus');
  td.verify(handleFocusChange(true), {times: 1});
});

test('#event.onFocus calls props.onFocus()', () => {
  const onFocus = td.func();
  const props: any = {onFocus, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('focus', event);
  td.verify(onFocus(event), {times: 1});
});

test('#event.onBlur calls props.handleFocusChange(false)', () => {
  const handleFocusChange = td.func();
  const props: any = {handleFocusChange, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  wrapper.simulate('blur');
  td.verify(handleFocusChange(false), {times: 1});
});

test('#event.onBlur calls props.onBlur()', () => {
  const onBlur = td.func();
  const props: any = {onBlur, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('blur', event);
  td.verify(onBlur(event), {times: 1});
});

test('#event.onMouseDown calls foundation.setTransformOrigin()', () => {
  const foundation: any = buildFoundation({setTransformOrigin: td.func()});
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {nativeEvent: () => undefined};
  wrapper.simulate('mouseDown', event);
  td.verify(foundation.setTransformOrigin(event.nativeEvent), {times: 1});
});

test('#event.onMouseDown calls props.onMouseDown()', () => {
  const onMouseDown = td.func();
  const props: any = {onMouseDown, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('mouseDown', event);
  td.verify(onMouseDown(event), {times: 1});
});

test('#event.onTouchStart calls foundation.setTransformOrigin()', () => {
  const foundation: any = buildFoundation({setTransformOrigin: td.func()});
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {nativeEvent: () => undefined};
  wrapper.simulate('touchStart', event);
  td.verify(foundation.setTransformOrigin(event.nativeEvent), {times: 1});
});

test('#event.onTouchStart calls props.onTouchStart()', () => {
  const onTouchStart = td.func();
  const props: any = {onTouchStart, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  const event = {preventDefault: () => {}};
  wrapper.simulate('touchStart', event);
  td.verify(onTouchStart(event), {times: 1});
});

test('#event.onChange calls foundation.autoCompleteFocus()', () => {
  const foundation: any = buildFoundation({autoCompleteFocus: td.func()});
  const wrapper = shallow(<Input foundation={foundation} />);
  const event = {target: {value: 'apple'}};
  wrapper.simulate('change', event);
  td.verify(foundation.autoCompleteFocus(), {times: 1});
});

test('#event.onChange calls props.onChange()', () => {
  const onChange = td.func();
  const props: any = {onChange, foundation: buildFoundation()};
  const wrapper = shallow(<Input {...props} />);
  const event = {target: {value: 'apple'}};
  wrapper.simulate('change', event);
  td.verify(onChange(event), {times: 1});
});

test('wasUserTriggeredChange test', () => {
  const foundation: any = buildFoundation();
  const wrapper = mount<Input<HTMLInputElement>>(
    <Input value='test value' foundation={foundation} />
  );
  wrapper.simulate('change');
  assert.isTrue(wrapper.instance().state.wasUserTriggeredChange);
  wrapper.setProps({value: 'meow'});
  assert.isFalse(wrapper.instance().state.wasUserTriggeredChange);
});

test('#inputElement should return the native input', () => {
  const wrapper = mount<Input<HTMLInputElement>>(<Input />);
  const inputElement = wrapper.instance().inputElement;
  assert.equal(inputElement!.tagName.toLowerCase(), 'input');
  assert.isTrue(inputElement instanceof HTMLInputElement);
});
