import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {coerceForTesting} from '../helpers/types';

import {BaseSelect} from '../../../packages/select/BaseSelect';
import NativeSelect from '../../../packages/select/NativeSelect';
import EnhancedSelect from '../../../packages/select/EnhancedSelect';
import {MDCSelectFoundation} from '@material/select/foundation';

suite('Base Select');

test('renders EnhancedSelect when props.enhanced is true', () => {
  const wrapper = shallow(<BaseSelect enhanced />);
  assert.equal(wrapper.find(EnhancedSelect).length, 1);
});

test('renders NativeSelect when props.enhanced is false', () => {
  const wrapper = shallow(<BaseSelect />);
  assert.equal(wrapper.find(NativeSelect).length, 1);
});

test('NativeSelect onFocus calls handleFocus', () => {
  const handleFocus = td.func();
  const onFocus = td.func<(evt: React.FocusEvent<HTMLSelectElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleFocus});
  const wrapper = shallow(
    <BaseSelect foundation={foundation} onFocus={onFocus} />
  );
  const nativeSelect = wrapper.find(NativeSelect);
  const evt = coerceForTesting<React.FocusEvent<HTMLSelectElement>>({});
  nativeSelect.simulate('focus', evt);
  td.verify(handleFocus(), {times: 1});
  td.verify(onFocus(evt), {times: 1});
});

test('EnhancedSelect onFocus calls handleFocus', () => {
  const handleFocus = td.func();
  const onFocus = td.func<(evt: React.FocusEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleFocus});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onFocus={onFocus} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const evt = coerceForTesting<React.FocusEvent<HTMLElement>>({});
  enhancedSelect.simulate('focus', evt);
  td.verify(handleFocus(), {times: 1});
  td.verify(onFocus(evt), {times: 1});
});

test('NativeSelect onBlur calls handleBlur', () => {
  const handleBlur = td.func();
  const onBlur = td.func<(evt: React.FocusEvent<HTMLSelectElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleBlur});
  const wrapper = shallow(
    <BaseSelect foundation={foundation} onBlur={onBlur} />
  );
  const nativeSelect = wrapper.find(NativeSelect);
  const evt = coerceForTesting<React.FocusEvent<HTMLSelectElement>>({});
  nativeSelect.simulate('blur', evt);
  td.verify(handleBlur(), {times: 1});
  td.verify(onBlur(evt), {times: 1});
});

test('EnhancedSelect onBlur calls handleBlur', () => {
  const handleBlur = td.func();
  const onBlur = td.func<(evt: React.FocusEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleBlur});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onBlur={onBlur} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const evt = coerceForTesting<React.FocusEvent<HTMLElement>>({});
  enhancedSelect.simulate('blur', evt);
  td.verify(handleBlur(), {times: 1});
  td.verify(onBlur(evt), {times: 1});
});

test('NativeSelect onTouchStart calls handleClick', () => {
  const handleClick = td.func();
  const onTouchStart = td.func<
    (evt: React.TouchEvent<HTMLSelectElement>) => void
  >();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect foundation={foundation} onTouchStart={onTouchStart} />
  );
  const nativeSelect = wrapper.find(NativeSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.TouchEvent<HTMLSelectElement>>({
    currentTarget,
    nativeEvent: {
      touches: [{clientX}],
    },
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  nativeSelect.simulate('touchstart', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onTouchStart(evt), {times: 1});
});

test('EnhancedSelect onTouchStart calls handleClick', () => {
  const handleClick = td.func();
  const onTouchStart = td.func<(evt: React.TouchEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onTouchStart={onTouchStart} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.TouchEvent<HTMLElement>>({
    currentTarget,
    nativeEvent: {
      touches: [{clientX}],
    },
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  enhancedSelect.simulate('touchstart', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onTouchStart(evt), {times: 1});
});

test('NativeSelect onMouseDown calls handleClick', () => {
  const handleClick = td.func();
  const onMouseDown = td.func<
    (evt: React.MouseEvent<HTMLSelectElement>) => void
  >();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect foundation={foundation} onMouseDown={onMouseDown} />
  );
  const nativeSelect = wrapper.find(NativeSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.MouseEvent<HTMLSelectElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  nativeSelect.simulate('mousedown', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onMouseDown(evt), {times: 1});
});

test('EnhancedSelect onMouseDown calls handleClick', () => {
  const handleClick = td.func();
  const onMouseDown = td.func<(evt: React.MouseEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onMouseDown={onMouseDown} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.MouseEvent<HTMLElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  enhancedSelect.simulate('mousedown', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onMouseDown(evt), {times: 1});
});

test('NativeSelect onClick calls handleClick', () => {
  const handleClick = td.func();
  const onClick = td.func<(evt: React.MouseEvent<HTMLSelectElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect foundation={foundation} onClick={onClick} />
  );
  const nativeSelect = wrapper.find(NativeSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.MouseEvent<HTMLSelectElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  nativeSelect.simulate('click', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onClick(evt), {times: 1});
});

test('EnhancedSelect onClick calls handleClick', () => {
  const handleClick = td.func();
  const onClick = td.func<(evt: React.MouseEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleClick});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onClick={onClick} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.MouseEvent<HTMLElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  enhancedSelect.simulate('click', evt);
  td.verify(handleClick(clientX - left), {times: 1});
  td.verify(onClick(evt), {times: 1});
});

test('NativeSelect onKeyDown calls props.onKeyDown', () => {
  const onKeyDown = td.func<
    (evt: React.KeyboardEvent<HTMLSelectElement>) => void
  >();
  const wrapper = shallow(<BaseSelect onKeyDown={onKeyDown} />);
  const nativeSelect = wrapper.find(NativeSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.KeyboardEvent<HTMLSelectElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  nativeSelect.simulate('keydown', evt);
  td.verify(onKeyDown(evt), {times: 1});
});

test('EnhancedSelect onKeyDown calls handleKeydown', () => {
  const handleKeydown = td.func();
  const onKeyDown = td.func<(evt: React.KeyboardEvent<HTMLElement>) => void>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleKeydown});
  const wrapper = shallow(
    <BaseSelect enhanced foundation={foundation} onKeyDown={onKeyDown} />
  );
  const enhancedSelect = wrapper.find(EnhancedSelect);
  const clientX = 100;
  const left = 10;
  const getBoundingClientRect = td.func();
  const currentTarget = coerceForTesting<Element>({getBoundingClientRect});
  const evt = coerceForTesting<React.KeyboardEvent<HTMLElement>>({
    currentTarget,
    nativeEvent: {clientX},
  });
  td.when(getBoundingClientRect()).thenReturn({left});

  enhancedSelect.simulate('keydown', evt);
  td.verify(handleKeydown(evt.nativeEvent), {times: 1});
  td.verify(onKeyDown(evt), {times: 1});
});

test('props.selectClassName gets passed to props.className of NativeSelect', () => {
  const wrapper = shallow(<BaseSelect selectClassName='test-class-name' />);
  assert.equal(wrapper.find(NativeSelect).props().className, 'test-class-name');
});

test('props.selectClassName gets passed to props.className of EnhancedSelect', () => {
  const wrapper = shallow(
    <BaseSelect enhanced selectClassName='test-class-name' />
  );
  assert.equal(
    wrapper.find(EnhancedSelect).props().className,
    'test-class-name'
  );
});
