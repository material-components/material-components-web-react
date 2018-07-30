// import React from 'react';
// import {assert} from 'chai';
// import {mount} from 'enzyme';
// import td from 'testdouble';
// import {Chip, ChipCheckmark} from '../../../packages/chips';
//
// suite('Chip');
//
// test('creates foundation', () => {
//   const wrapper = mount(<Chip>Hello world</Chip>);
//   assert.exists(wrapper.instance().foundation_);
// });
//
// test('classNames adds classes', () => {
//   const wrapper = mount(<Chip className='test-class-name' />);
//   assert.isTrue(wrapper.hasClass('test-class-name'));
// });
//
// test('renders chip', () => {
//   const wrapper = mount(<Chip>Hello world</Chip>);
//   assert.exists(wrapper.find('.mdc-chip'));
// });
//
// test('#adapter.addClass adds class to state.classList', () => {
//   const wrapper = mount(<Chip>Jane Doe</Chip>);
//   wrapper.instance().foundation_.adapter_.addClass('test-class-name');
//   assert.isTrue(wrapper.state().classList.has('test-class-name'));
// });
//
// test('#adapter.removeClass removes class from state.classList', () => {
//   const wrapper = mount(<Chip>Jane Doe</Chip>);
//   const classList = new Set();
//   classList.add('test-class-name');
//   wrapper.setState({classList});
//   wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
//   assert.isFalse(wrapper.state().classList.has('test-class-name'));
// });
//
// test('on click calls #props.handleSelect', () => {
//   const handleSelect = td.func();
//   const wrapper = mount(<Chip id={123} handleSelect={handleSelect}>Jane Doe</Chip>);
//   wrapper.simulate('click');
//   td.verify(handleSelect(123));
// });
//
// test('renders chip checkmark if it exists', () => {
//   const wrapper = mount(<Chip chipCheckmark={<ChipCheckmark/>}>Jane Doe</Chip>);
//   assert.exists(wrapper.find('.mdc-chip__checkmark'));
// });
//
// test('adds mndc-chip--selected class if selected prop is true', () => {
//   const wrapper = mount(<Chip selected>Jane Doe</Chip>);
//   assert.exists(wrapper.hasClass('.mdc-chip--selected'));
// });
