import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import EnhancedSelect from '../../../packages/select/EnhancedSelect';
import {Option} from '../../../packages/select/index';
import {coerceForTesting} from '../helpers/types';
import MDCSelectFoundation from '@material/select/foundation';

suite.only('Enhanced Select');

const testEvt = {
  test: 'test',
  clientX: 20,
  target: {
    getBoundingClientRect: () => ({left: 15}),
    value: 'value',
  },
};

test('#event.focus calls #props.onFocus', () => {
  const onFocus = coerceForTesting<React.FocusEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onFocus={onFocus} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  selectedTextEl.simulate('focus', testEvt);
  td.verify(onFocus(coerceForTesting<React.FocusEvent<HTMLDivElement>>(testEvt)), {times: 1});
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = coerceForTesting<React.FocusEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onBlur={onBlur} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  selectedTextEl.simulate('blur', testEvt);
  td.verify(onBlur(coerceForTesting<React.FocusEvent<HTMLDivElement>>(testEvt)), {times: 1});
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = coerceForTesting<React.MouseEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onMouseDown={onMouseDown} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  selectedTextEl.simulate('mousedown', testEvt);
  td.verify(onMouseDown(coerceForTesting<React.MouseEvent<HTMLDivElement>>(testEvt)), {times: 1});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<React.TouchEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onTouchStart={onTouchStart} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  selectedTextEl.simulate('touchstart', testEvt);
  td.verify(onTouchStart(coerceForTesting<React.TouchEvent<HTMLDivElement>>(testEvt)), {times: 1});
});

test('#event.keydown calls #props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<React.KeyboardEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onKeyDown={onKeyDown} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  selectedTextEl.simulate('keydown', testEvt);
  td.verify(onKeyDown(coerceForTesting<React.KeyboardEvent<HTMLDivElement>>(testEvt)), {times: 1});
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<React.TouchEventHandler<HTMLDivElement>>(td.func());
  const wrapper = shallow(<EnhancedSelect onTouchStart={onTouchStart} />);
  const selectedTextEl = wrapper.find(MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR);
  const evt = coerceForTesting<React.TouchEvent<HTMLDivElement>>({
    test: 'test',
    touches: [{clientX: 20}],
    target: {
      getBoundingClientRect: () => ({left: 15}),
      value: 'value',
    },
  });
  selectedTextEl.simulate('touchstart', evt);
  td.verify(onTouchStart(evt), {times: 1});
});

test('renders children', () => {
  const wrapper = shallow(
    <EnhancedSelect>
      <option value='test'>test</option>
    </EnhancedSelect>
  );
  assert.equal(wrapper.find('option[value="test"]').length, 1);
});

test.only('state.selectedItem and state.selectedValue updates when props.value updates', () => {
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect>
      <Option data-value='test'>test</Option>
    </EnhancedSelect>
  );
  wrapper.setProps({value: 'test'});
  debugger
  // assert.isTrue(wrapper.state().selectedItem, wrapper.find('option').getDOMNode());
});