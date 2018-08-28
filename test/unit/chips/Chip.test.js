import React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import td from 'testdouble';
import {Chip} from '../../../packages/chips/Chip';
import ChipCheckmark from '../../../packages/chips/ChipCheckmark';

suite('Chip');

test('creates foundation', () => {
  const wrapper = mount(<Chip>Hello world</Chip>);
  assert.exists(wrapper.instance().foundation_);
});

test('calls setSelected if props.selected is true (#foundation.setSelected)', () => {
  const wrapper = mount(<Chip selected>Hello world</Chip>);
  assert.isTrue(wrapper.state().classList.has('mdc-chip--selected'));
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('classNames adds classes from state.classList', () => {
  const wrapper = shallow(<Chip />);
  wrapper.setState({classList: new Set(['test-class-name'])});
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<Chip>Jane Doe</Chip>);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Chip>Jane Doe</Chip>);
  const classList = new Set(['test-class-name']);
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass returns true if component contains class', () => {
  const wrapper = shallow(<Chip className='test-class-name'>Jane Doe</Chip>);
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class-name'));
});

test('#adapter.eventTargetHasClass returns true if element contains class', () => {
  const wrapper = shallow(<Chip>Jane Doe</Chip>);
  const target = document.createElement('div');
  target.classList.add('test-class-name');
  assert.isTrue(wrapper.instance().foundation_.adapter_.eventTargetHasClass(target, 'test-class-name'));
});

test('#adapter.eventTargetHasClass returns true if element contains class', () => {
  const wrapper = mount(<TabIndicator />);
  const transform = 'translateX(10px)';
  wrapper.instance().adapter.setContentStyleProperty('transform', transform);
  const contentElement = wrapper.find('.mdc-tab-indicator__content').getDOMNode();
  assert.equal(contentElement.style.transform, transform);
});
test('on click calls #props.handleSelect', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<Chip id={123} handleSelect={handleSelect}>Jane Doe</Chip>);
  wrapper.simulate('click');
  td.verify(handleSelect(123));
});

test('renders chip checkmark if it exists', () => {
  const wrapper = shallow(<Chip chipCheckmark={<ChipCheckmark/>}>Jane Doe</Chip>);
  assert.exists(wrapper.find('.mdc-chip__checkmark'));
});

test('adds mdc-chip--selected class if selected prop is true', () => {
  const wrapper = shallow(<Chip selected>Jane Doe</Chip>);
  assert.exists(wrapper.hasClass('.mdc-chip--selected'));
});

test('renders chip', () => {
  const wrapper = shallow(<Chip>Hello world</Chip>);
  assert.exists(wrapper.find('.mdc-chip'));
});
