import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import NativeSelect from '../../../packages/select/NativeSelect';
import {coerceForTesting} from '../helpers/types';
import MDCSelectFoundation from '@material/select/foundation';

suite('Select Native');

const testEvt = {
  test: 'test',
  clientX: 20,
  target: {
    getBoundingClientRect: () => ({left: 15}),
    value: 'value',
  },
};

test('has mdc-select__native-control class', () => {
  const wrapper = shallow(<NativeSelect />);
  assert.isTrue(wrapper.hasClass('mdc-select__native-control'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<NativeSelect className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('#event.focus calls #foundation.handleFocus', () => {
  const foundation = coerceForTesting<MDCSelectFoundation>({handleFocus: td.func()});
  const wrapper = shallow(<NativeSelect foundation={foundation} />);
  wrapper.simulate('focus', testEvt);
  td.verify(foundation.handleFocus(), {times: 1});
});

test('#event.focus calls #props.onFocus', () => {
  const onFocus = coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onFocus={onFocus} />);
  wrapper.simulate('focus', testEvt);
  td.verify(onFocus(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.blur calls #foundation.handleBlur', () => {
  const foundation = coerceForTesting<MDCSelectFoundation>({
    handleBlur: coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func())
  });
  const wrapper = shallow(<NativeSelect foundation={foundation} />);
  wrapper.simulate('blur', testEvt);
  td.verify(foundation.handleBlur(), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = coerceForTesting<React.FocusEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onBlur={onBlur} />);
  wrapper.simulate('blur', testEvt);
  td.verify(onBlur(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.change calls #props.onChange', () => {
  const onChange = coerceForTesting<React.ChangeEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onChange={onChange} />);
  wrapper.simulate('change', testEvt);
  td.verify(onChange(coerceForTesting<React.FocusEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = coerceForTesting<React.MouseEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onMouseDown={onMouseDown} />);
  wrapper.simulate('mousedown', testEvt);
  td.verify(onMouseDown(coerceForTesting<React.MouseEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<React.TouchEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onTouchStart={onTouchStart} />);
  wrapper.simulate('touchstart', testEvt);
  td.verify(onTouchStart(coerceForTesting<React.TouchEvent<HTMLSelectElement>>(testEvt)), {times: 1});
});

// test('#event.mousedown calls #props.setRippleCenter if target is nativeSelect', () => {
//   const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
//   const wrapper = mount<NativeSelect>(<NativeSelect setRippleCenter={setRippleCenter} />);
//   wrapper.instance().nativeSelect
//     = coerceForTesting<React.RefObject<HTMLSelectElement>>({current: testEvt.target});
//   wrapper.simulate('mousedown', testEvt);
//   const left = testEvt.target.getBoundingClientRect().left;
//   td.verify(setRippleCenter(testEvt.clientX - left), {times: 1});
// });

// test('#event.mousedown does not call #props.setRippleCenter if target is not nativeSelect', () => {
//   const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
//   const wrapper = mount(<NativeSelect setRippleCenter={setRippleCenter} />);
//   wrapper.simulate('mousedown', testEvt);
//   const left = testEvt.target.getBoundingClientRect().left;
//   td.verify(setRippleCenter(testEvt.clientX - left), {times: 0});
// });

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<React.TouchEventHandler<HTMLSelectElement>>(td.func());
  const wrapper = shallow(<NativeSelect onTouchStart={onTouchStart} />);
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

// test('#event.touchstart calls #props.setRippleCenter if target is nativeSelect', () => {
//   const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
//   const wrapper = mount<NativeSelect>(<NativeSelect setRippleCenter={setRippleCenter} />);
//   const evt = {
//     test: 'test',
//     touches: [{clientX: 20}],
//     target: {
//       getBoundingClientRect: () => ({left: 15}),
//       value: 'value',
//     },
//   };
//   wrapper.instance().nativeSelect = coerceForTesting<React.RefObject<HTMLSelectElement>>({current: evt.target});
//   wrapper.simulate('touchstart', evt);
//   const left = evt.target.getBoundingClientRect().left;
//   td.verify(setRippleCenter(20 - left), {times: 1});
// });

// test('#event.touchstart does not call #props.setRippleCenter if target is not nativeSelect', () => {
//   const setRippleCenter = coerceForTesting<(rippleCenter: number) => void>(td.func());
//   const wrapper = mount(<NativeSelect setRippleCenter={setRippleCenter} />);
//   const evt = {
//     test: 'test',
//     touches: [{clientX: 20}],
//     target: {
//       getBoundingClientRect: () => ({left: 15}),
//       value: 'value',
//     },
//   };
//   wrapper.simulate('touchstart', evt);
//   const left = evt.target.getBoundingClientRect().left;
//   td.verify(setRippleCenter(20 - left), {times: 0});
// });

test('renders children', () => {
  const wrapper = shallow(
    <NativeSelect>
      <option value='test'>test</option>
    </NativeSelect>
  );
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});
