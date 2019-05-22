import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import EnhancedSelect from '../../../packages/select/EnhancedSelect';
import {Option} from '../../../packages/select/index';
import {coerceForTesting} from '../helpers/types';
import {MDCSelectFoundation} from '@material/select/foundation';
import Menu from '../../../packages/menu/index';

suite('Enhanced Select');

const testEvt = {
  test: 'test',
  clientX: 20,
  target: {
    getBoundingClientRect: () => ({left: 15}),
    value: 'value',
  },
};

test('#event.focus calls #props.onFocus', () => {
  const onFocus = coerceForTesting<React.FocusEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow(<EnhancedSelect onFocus={onFocus} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('focus', testEvt);
  td.verify(
    onFocus(coerceForTesting<React.FocusEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.click calls #props.onClick', () => {
  const onClick = coerceForTesting<React.MouseEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow(<EnhancedSelect onClick={onClick} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('click', testEvt);
  td.verify(
    onClick(coerceForTesting<React.MouseEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.blur calls #props.onBlur', () => {
  const onBlur = coerceForTesting<React.FocusEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow(<EnhancedSelect onBlur={onBlur} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('blur', testEvt);
  td.verify(
    onBlur(coerceForTesting<React.FocusEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.mousedown calls #props.onMouseDown', () => {
  const onMouseDown = coerceForTesting<React.MouseEventHandler<HTMLDivElement>>(
    td.func()
  );
  const wrapper = shallow(<EnhancedSelect onMouseDown={onMouseDown} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('mousedown', testEvt);
  td.verify(
    onMouseDown(coerceForTesting<React.MouseEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<
    React.TouchEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<EnhancedSelect onTouchStart={onTouchStart} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('touchstart', testEvt);
  td.verify(
    onTouchStart(coerceForTesting<React.TouchEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.keydown calls #props.onKeyDown', () => {
  const onKeyDown = coerceForTesting<
    React.KeyboardEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<EnhancedSelect onKeyDown={onKeyDown} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
  selectedTextEl.simulate('keydown', testEvt);
  td.verify(
    onKeyDown(coerceForTesting<React.KeyboardEvent<HTMLDivElement>>(testEvt)),
    {times: 1}
  );
});

test('#event.touchstart calls #props.onTouchStart', () => {
  const onTouchStart = coerceForTesting<
    React.TouchEventHandler<HTMLDivElement>
  >(td.func());
  const wrapper = shallow(<EnhancedSelect onTouchStart={onTouchStart} />);
  const selectedTextEl = wrapper.find(
    MDCSelectFoundation.strings.SELECTED_TEXT_SELECTOR
  );
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
      <Option data-value='test'>test</Option>
    </EnhancedSelect>
  );
  assert.equal(wrapper.find(Option).length, 1);
});

test('state.selectedItem and state.selectedValue updates when props.value updates', () => {
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect>
      <Option data-value='test'>test</Option>
    </EnhancedSelect>
  );
  wrapper.setProps({value: 'test'});
  const listItem = wrapper.find('.mdc-list-item').getDOMNode();
  assert.equal(wrapper.state().selectedItem, listItem);
  assert.equal(wrapper.state().selectedValue, 'test');
  wrapper.unmount();
});

test('state.selectedItem and state.selectedValue do not update when props.value updates with no Options', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect />);
  wrapper.setProps({value: 'test'});
  assert.equal(wrapper.state().selectedItem, null);
  assert.equal(wrapper.state().selectedValue, '');
  wrapper.unmount();
});

test('listElements returns Option element', () => {
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect>
      <Option data-value='test'>test</Option>
    </EnhancedSelect>
  );
  const listElement = coerceForTesting<Element[]>(
    wrapper.instance().listElements
  )[0];
  assert.equal(listElement, wrapper.find('Option').getDOMNode());
  wrapper.unmount();
});

test('Menu.onClose calls sets aria-expanded and calls props.closeMenu, foundation.handleBlur', () => {
  const closeMenu = td.func<() => {}>();
  const handleBlur = td.func<() => {}>();
  const foundation = coerceForTesting<MDCSelectFoundation>({handleBlur});
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect closeMenu={closeMenu} foundation={foundation}>
      <Option data-value='test'>test</Option>
    </EnhancedSelect>
  );
  wrapper.setState({'aria-expanded': true});
  wrapper.find(Menu).props().onClose!();

  td.verify(closeMenu(), {times: 1});
  td.verify(handleBlur(), {times: 1});
  assert.equal(wrapper.state()['aria-expanded'], undefined);
  wrapper.unmount();
});

test('Menu.onOpen calls sets aria-expanded sets list item to focus', () => {
  const div = document.createElement('div');
  document.body.append(div);
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect>
      <Option data-value='test'>test</Option>
    </EnhancedSelect>,
    {attachTo: div}
  );
  wrapper.find(Menu).props().onOpen!();

  assert.equal(document.activeElement, wrapper.find(Option).getDOMNode());
  assert.equal(wrapper.state()['aria-expanded'], true);
  div.remove();
  wrapper.unmount();
});

test('renders selectedText element aria-required if props.required true', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect required />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-required'), 'true');
  wrapper.unmount();
});

test('renders selectedText element aria-expanded if state.aria-expanded true', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect />);
  wrapper.setState({'aria-expanded': true});
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-expanded'), 'true');
  wrapper.unmount();
});

test('renders selectedText element aria-expanded if state.aria-expanded "true"', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect />);
  wrapper.setState({'aria-expanded': 'true'});
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-expanded'), 'true');
  wrapper.unmount();
});

test('renders selectedText element aria-invalid if props.isInvalid is true', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect isInvalid />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-invalid'), 'true');
  wrapper.unmount();
});

test('renders selectedText element aria-disabled if props.disabled true', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect disabled />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-disabled'), 'true');
  wrapper.unmount();
});

test('renders selectedText element aria-disabled as false if props.disabled false', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('aria-disabled'), 'false');
  wrapper.unmount();
});

test('renders selectedText element tabindex as 0', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('tabindex'), '0');
  wrapper.unmount();
});

test('renders selectedText element tabindex as -1 if disabled', () => {
  const wrapper = mount<EnhancedSelect>(<EnhancedSelect disabled />);
  const selectedText = wrapper.find('.mdc-select__selected-text').getDOMNode();
  assert.equal(selectedText.getAttribute('tabindex'), '-1');
  wrapper.unmount();
});

test('renders selectedText with state.selectedItem trimed', () => {
  const wrapper = mount<EnhancedSelect>(
    <EnhancedSelect value='test321'>
      <Option data-value='test321'>MEOW MEOW</Option>
    </EnhancedSelect>
  );
  assert.equal(wrapper.find('.mdc-select__selected-text').text(), 'MEOW MEOW');
  wrapper.unmount();
});
