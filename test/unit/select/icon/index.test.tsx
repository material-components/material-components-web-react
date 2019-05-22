import * as React from 'react';
import * as td from 'testdouble';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import {SelectIcon} from '../../../../packages/select/index';
import {MDCSelectIconFoundation} from '@material/select';

suite('Select Icon');

test('renders with mdc-select-helper-text class', () => {
  const wrapper = shallow(<SelectIcon />);
  assert.isTrue(wrapper.hasClass('mdc-select__icon'));
});

test('renders with a test class name', () => {
  const wrapper = shallow(<SelectIcon className='test-class' />);
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('calls setIconFoundation with foundation', () => {
  const setIconFoundation = td.func<
    (foundation?: MDCSelectIconFoundation) => void
  >();
  shallow(<SelectIcon setIconFoundation={setIconFoundation} />);
  td.verify(setIconFoundation(td.matchers.isA(Object)), {times: 1});
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon />);
  const foundation = wrapper.instance().foundation!;
  foundation.destroy = td.func<() => void>();
  wrapper.unmount();
  td.verify(foundation.destroy(), {times: 1});
});

test('#adapter.setAttr should update state', () => {
  const wrapper = shallow<SelectIcon>(<SelectIcon />);
  wrapper.instance().adapter.setAttr('role', 'menu');
  assert.equal(wrapper.state().role, 'menu');
});

test('#adapter.removeAttr should update state', () => {
  const wrapper = shallow<SelectIcon>(<SelectIcon />);
  wrapper.setState({role: 'menu'});
  wrapper.instance().adapter.removeAttr('role');
  assert.equal(wrapper.state().role, null);
});

test('renders with tabindex from state.tabindex', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon />);
  wrapper.setState({tabindex: 1});
  assert.equal(wrapper.getDOMNode().getAttribute('tabindex'), '1');
});

test('#adapter.getAttr returns the correct value of role', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon role='menu' />);
  assert.equal(wrapper.instance().adapter.getAttr('role'), 'menu');
});

test('#adapter.getAttr returns the correct value of tabindex', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon tabIndex={1} />);
  assert.equal(wrapper.instance().adapter.getAttr('tabindex'), '1');
});

test('#adapter.getAttr returns the correct value of role if it exists on state.role', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon />);
  wrapper.setState({role: 'menu'});
  assert.equal(wrapper.instance().adapter.getAttr('role'), 'menu');
});

test('renders with role from state.role', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon />);
  wrapper.setState({role: 'true'});
  assert.equal(wrapper.getDOMNode().getAttribute('role'), 'true');
});

test('renders children', () => {
  const wrapper = mount<SelectIcon>(<SelectIcon>MEOW</SelectIcon>);
  assert.equal(wrapper.text(), 'MEOW');
});
