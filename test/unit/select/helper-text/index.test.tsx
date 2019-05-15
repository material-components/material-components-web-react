import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import {SelectHelperText} from '../../../../packages/select/helper-text/index';
import {MDCSelectHelperTextFoundation} from '@material/select/helper-text/foundation';

suite('Select Helper Text');

test('renders with mdc-select-helper-text class', () => {
  const wrapper = shallow(<SelectHelperText />);
  assert.isTrue(wrapper.hasClass('mdc-select-helper-text'));
});

test('renders with a test class name', () => {
  const wrapper = shallow(<SelectHelperText className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('renders with class from state.classList', () => {
  const wrapper = shallow(<SelectHelperText />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('renders with persistent class when props.persistent is true', () => {
  const wrapper = shallow(<SelectHelperText persistent />);
  assert.isTrue(wrapper.hasClass('mdc-select-helper-text--persistent'));
});

test('calls setHelperTextFoundation with foundation', () => {
  const setHelperTextFoundation = td.func<
    (foundation?: MDCSelectHelperTextFoundation) => void
  >();
  shallow(
    <SelectHelperText setHelperTextFoundation={setHelperTextFoundation} />
  );
  td.verify(setHelperTextFoundation(td.matchers.isA(Object)), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = mount<SelectHelperText>(<SelectHelperText />);
  const foundation = wrapper.instance().foundation!;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.addClass should add a class to state.classList', () => {
  const wrapper = shallow<SelectHelperText>(<SelectHelperText />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass should remove a class to state.classList', () => {
  const wrapper = shallow<SelectHelperText>(<SelectHelperText />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass should return true if state.classList has class', () => {
  const wrapper = shallow<SelectHelperText>(<SelectHelperText />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.hasClass should return true if className has class', () => {
  const wrapper = shallow<SelectHelperText>(
    <SelectHelperText className='test-class' />
  );
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.setAttr should update state', () => {
  const wrapper = shallow<SelectHelperText>(<SelectHelperText />);
  wrapper.instance().adapter.setAttr('role', 'menu');
  assert.equal(wrapper.state().role, 'menu');
});

test('#adapter.removeAttr should update state', () => {
  const wrapper = shallow<SelectHelperText>(<SelectHelperText />);
  wrapper.setState({role: 'menu'});
  wrapper.instance().adapter.removeAttr('role');
  assert.equal(wrapper.state().role, null);
});

test('renders with aria-hidden from state.aria-hidden', () => {
  const wrapper = mount<SelectHelperText>(<SelectHelperText />);
  wrapper.setState({'aria-hidden': 'true'});
  assert.equal(wrapper.getDOMNode().getAttribute('aria-hidden'), 'true');
});

test('renders with role from state.role', () => {
  const wrapper = mount<SelectHelperText>(<SelectHelperText />);
  wrapper.setState({role: 'true'});
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'true');
});

test('renders children', () => {
  const wrapper = mount<SelectHelperText>(
    <SelectHelperText>MEOW</SelectHelperText>
  );
  assert.equal(wrapper.text(), 'MEOW');
});
