import React from 'react';
import td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import NativeControl from '../../../packages/select/NativeControl';
import {coerceForTesting} from '../helpers/types';

suite('Select Native Input');

const testEvt = {
  test: 'test',
  clientX: 20,
  target: {
    getBoundingClientRect: () => ({left: 15}),
    value: 'value',
  },
};

test('has mdc-select__native-control class', () => {
  const wrapper = shallow(<NativeControl />);
  assert.isTrue(wrapper.hasClass('mdc-select__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<NativeControl className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('calls props.handleDisabled if props.disabled updates', () => {
  const handleDisabled = coerceForTesting<(d: boolean) => void>(td.func());
  const wrapper = shallow(<NativeControl handleDisabled={handleDisabled} />);
  wrapper.setProps({disabled: true});
  td.verify(handleDisabled(true), {times: 1});
});

test('#event.focus calls #foundation.handleFocus', () => {
  const foundation = {handleFocus: td.func()};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.simulate('focus', testEvt);
  td.verify(foundation.handleFocus(testEvt), {times: 1});
});

test('#event.focus calls #props.onFocus', () => {
  const onFocus = coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeControl onFocus={onFocus} />);
  wrapper.simulate('focus', testEvt);
  td.verify(onFocus(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.blur calls #foundation.handleBlur', () => {
  const foundation = {handleBlur: coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func())};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.simulate('blur', testEvt);
  td.verify(foundation.handleBlur(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeControl onBlur={onBlur} />);
  wrapper.simulate('blur', testEvt);
  td.verify(onBlur(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = coerceForTesting<React.ChangeEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  wrapper.simulate('change', testEvt);
  td.verify(onChange(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = coerceForTesting<React.MouseEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeControl onMouseDown={onMouseDown} />);
  wrapper.simulate('mousedown', testEvt);
  td.verify(onMouseDown(coerceForTesting<React.MouseEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.mousedown calls #props.setRippleCenter if target is nativeControl', () => {
  const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
  const wrapper = mount<NativeControl>(<NativeControl setRippleCenter={setRippleCenter} />);
  wrapper.instance().nativeControl_
    = coerceForTesting<React.RefObject<HTMLSelectElement>>({current: testEvt.target});
  wrapper.simulate('mousedown', testEvt);
  const left = testEvt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(testEvt.clientX - left), {times: 1});
});

test('#event.mousedown does not call #props.setRippleCenter if target is not nativeControl', () => {
  const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
  const wrapper = mount(<NativeControl setRippleCenter={setRippleCenter} />);
  wrapper.simulate('mousedown', testEvt);
  const left = testEvt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(testEvt.clientX - left), {times: 0});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<React.TouchEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeControl onTouchStart={onTouchStart} />);
  const evt = coerceForTesting<React.TouchEvent<HTMLSelectElement>>({
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  });
  wrapper.simulate('touchstart', evt);
  td.verify(onTouchStart(evt), {times: 1});
});

test('#event.touchstart calls #props.setRippleCenter if target is nativeControl', () => {
  const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
  const wrapper = mount<NativeControl>(<NativeControl setRippleCenter={setRippleCenter} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  };
  wrapper.instance().nativeControl_ = coerceForTesting<React.RefObject<HTMLSelectElement>>({current: evt.target});
  wrapper.simulate('touchstart', evt);
  const left = evt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(20 - left), {times: 1});
});

test('#event.touchstart does not call #props.setRippleCenter if target is not nativeControl', () => {
  const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
  const wrapper = mount(<NativeControl setRippleCenter={setRippleCenter} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  };
  wrapper.simulate('touchstart', evt);
  const left = evt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(20 - left), {times: 0});
});

test('renders children', () => {
  const wrapper = shallow(
    <NativeControl>
      <option value='test'>test</option>
    </NativeControl>
  );
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});
