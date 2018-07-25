import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import td from 'testdouble';
import {ChipBase as Chip, ChipCheckmark} from '../../../packages/chips';

suite('Chip');

test('creates foundation', () => {
  const wrapper = shallow(<Chip />);
  assert.exists(wrapper.instance().foundation_);
});

test('classNames adds classes', () => {
  const wrapper = shallow(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders chip', () => {
  const wrapper = shallow(<Chip />);
  assert.exists(wrapper.find('.mdc-chip'));
});

test('renders leading icon', () => {
  const leadingIcon = <div className='my-leading-icon'></div>;
  const wrapper = shallow(<Chip leadingIcon={leadingIcon}/>);
  assert.exists(wrapper.find('.mdc-chip__icon--leading'));
});

test('renders remove icon', () => {
  const removeIcon = <div className='my-remove-icon'>Remove</div>;
  const wrapper = shallow(<Chip removeIcon={removeIcon}/>);
  assert.exists(wrapper.find('.mdc-chip__icon--trailing'));
});

test('renders chip checkmark if it exists', () => {
  const wrapper = shallow(<Chip chipCheckmark={<ChipCheckmark/>} />);
  assert.exists(wrapper.find('.mdc-chip__checkmark'));
});

test('adds mdc-chip--selected class if selected prop is true', () => {
  const wrapper = shallow(<Chip selected />);
  assert.exists(wrapper.hasClass('mdc-chip--selected'));
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = shallow(<Chip />);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Chip />);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass returns whether class exists in classList', () => {
  const wrapper = shallow(<Chip />);
  const classList = new Set();
  wrapper.setState({classList});
  assert.isFalse(wrapper.instance().foundation_.adapter_.hasClass('test-class-name'));

  classList.add('test-class-name');
  wrapper.setState({classList});
  assert.isTrue(wrapper.instance().foundation_.adapter_.hasClass('test-class-name'));
});

test('#adapter.notifyRemoval calls #props.handleRemove', () => {
  const handleRemove = td.func();
  const wrapper = shallow(<Chip handleRemove={handleRemove} />);
  wrapper.instance().foundation_.adapter_.notifyRemoval();
  td.verify(handleRemove());
});

test('on click calls #props.handleSelect', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<Chip handleSelect={handleSelect} />);
  wrapper.simulate('click');
  td.verify(handleSelect());
});

// TODO: Update with public MDCChipFoundation handler.
test('on transition end calls #foundation.transitionEndHandler_', () => {
  const wrapper = shallow(<Chip />);
  wrapper.instance().foundation_.transitionEndHandler_ = td.func();
  const event = {test: '123'};
  wrapper.simulate('transitionEnd', event);
  td.verify(wrapper.instance().foundation_.transitionEndHandler_(event));
});

// TODO: Update with public MDCChipFoundation handler.
test('on remove icon click, calls #foundation.trailingIconInteractionHandler_', () => {
  const removeIcon = <div className='remove-icon'>Remove</div>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  wrapper.instance().foundation_.trailingIconInteractionHandler_ = td.func();
  const event = {test: '123'};
  wrapper.find('.remove-icon').simulate('click', event);
  td.verify(wrapper.instance().foundation_.trailingIconInteractionHandler_(event));
});
