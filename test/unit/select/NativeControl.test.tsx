import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import NativeControl from '../../../packages/select/NativeControl';

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
  const wrapper = shallow(<NativeControl className="test-class-name" />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('calls props.handleDisabled if props.disabled updates', () => {
  const handleDisabled = td.func() as (d: boolean) => void;
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
  const onFocus = td.func() as React.FocusEventHandler<HTMLSelectElement>;
  const wrapper = shallow(<NativeControl onFocus={onFocus} />);
  wrapper.simulate('focus', testEvt);
  td.verify(onFocus(testEvt as unknown as React.FocusEvent<HTMLSelectElement>), {times: 1});
});

test('#event.blur calls #foundation.handleBlur', () => {
  const foundation = {handleBlur: td.func() as React.FocusEventHandler<HTMLSelectElement>};
  const wrapper = shallow(<NativeControl foundation={foundation} />);
  wrapper.simulate('blur', testEvt);
  td.verify(foundation.handleBlur(testEvt as unknown as React.FocusEvent<HTMLSelectElement>), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = td.func() as React.FocusEventHandler<HTMLSelectElement>;
  const wrapper = shallow(<NativeControl onBlur={onBlur} />);
  wrapper.simulate('blur', testEvt);
  td.verify(onBlur(testEvt as unknown as React.FocusEvent<HTMLSelectElement>), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = td.func() as React.ChangeEventHandler<HTMLSelectElement>;
  const wrapper = shallow(<NativeControl onChange={onChange} />);
  wrapper.simulate('change', testEvt);
  td.verify(onChange(testEvt as unknown as React.FocusEvent<HTMLSelectElement>), {times: 1});
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = td.func() as React.MouseEventHandler<HTMLSelectElement>;
  const wrapper = shallow(<NativeControl onMouseDown={onMouseDown} />);
  wrapper.simulate('mousedown', testEvt);
  td.verify(onMouseDown(testEvt as unknown as React.MouseEvent<HTMLSelectElement>), {times: 1});
});

test('#event.mousedown calls #props.setRippleCenter if target is nativeControl', () => {
  const setRippleCenter = td.func() as (rippleCenter: number) => void;
  const wrapper = mount<NativeControl>(<NativeControl setRippleCenter={setRippleCenter} />);
  wrapper.instance().nativeControl_ = {current: testEvt.target} as React.RefObject<HTMLSelectElement>;
  wrapper.simulate('mousedown', testEvt);
  const left = testEvt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(testEvt.clientX - left), {times: 1});
});

test('#event.mousedown does not call #props.setRippleCenter if target is not nativeControl', () => {
  const setRippleCenter = td.func() as (rippleCenter: number) => void;
  const wrapper = mount(<NativeControl setRippleCenter={setRippleCenter} />);
  wrapper.simulate('mousedown', testEvt);
  const left = testEvt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(testEvt.clientX - left), {times: 0});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = td.func() as React.TouchEventHandler<HTMLSelectElement>;
  const wrapper = shallow(<NativeControl onTouchStart={onTouchStart} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  } as unknown as React.TouchEvent<HTMLSelectElement>;
  wrapper.simulate('touchstart', evt);
  td.verify(onTouchStart(evt), {times: 1});
});

test('#event.touchstart calls #props.setRippleCenter if target is nativeControl', () => {
  const setRippleCenter = td.func() as (rippleCenter: number) => void;
  const wrapper = mount<NativeControl>(<NativeControl setRippleCenter={setRippleCenter} />);
  const evt = {
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  };
  wrapper.instance().nativeControl_ = {current: evt.target} as React.RefObject<HTMLSelectElement>;
  wrapper.simulate('touchstart', evt);
  const left = evt.target.getBoundingClientRect().left;
  td.verify(setRippleCenter(20 - left), {times: 1});
});

test('#event.touchstart does not call #props.setRippleCenter if target is not nativeControl', () => {
  const setRippleCenter = td.func() as (rippleCenter: number) => void;
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
      <option value="test">test</option>
    </NativeControl>
  );
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});
