import React from 'react';
import {assert} from 'chai';
import {mount, shallow} from 'enzyme';
import td from 'testdouble';
import {Chip} from '../../../packages/chips/Chip';
import ChipCheckmark from '../../../packages/chips/ChipCheckmark';

suite('Chip');

test('creates foundation', () => {
  const wrapper = mount(<Chip/>);
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
  const wrapper = shallow(<Chip />);
  wrapper.instance().adapter.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = shallow(<Chip />);
  const classList = new Set(['test-class-name']);
  wrapper.setState({classList});
  wrapper.instance().adapter.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.hasClass returns true if component contains class', () => {
  const wrapper = shallow(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class-name'));
});

test('#adapter.eventTargetHasClass returns true if element contains class', () => {
  const wrapper = shallow(<Chip />);
  const target = document.createElement('div');
  target.classList.add('test-class-name');
  assert.isTrue(wrapper.instance().adapter.eventTargetHasClass(target, 'test-class-name'));
});

test('#adapter.getComputedStyleValue should get styles from chip element', () => {
  const div = document.createElement('div');
  // needs to be attached to real DOM to get width
  // https://github.com/airbnb/enzyme/issues/1525
  document.body.append(div);
  const options = {attachTo: div};

  const wrapper = mount(<Chip />, options);
  const width = '10px';
  const chipElement = wrapper.find('.mdc-chip').getDOMNode();
  chipElement.style.setProperty('width', width);
  assert.equal(wrapper.instance().adapter.getComputedStyleValue('width'), width);
  div.remove();
});

test('#adapter.setStyleProperty should add styles to chip', () => {
  const wrapper = mount(<Chip />);
  const width = '10px';
  wrapper.instance().adapter.setStyleProperty('width', width);
  const chipElement = wrapper.find('.mdc-chip').getDOMNode();
  assert.equal(chipElement.style.width, width);
});

test('on click calls #props.onClick', () => {
  const onClick = td.func();
  const wrapper = shallow(<Chip onClick={onClick} />);
  const evt = {};
  wrapper.simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('on click calls #props.handleSelect', () => {
  const handleSelect = td.func();
  const wrapper = shallow(<Chip id='123' handleSelect={handleSelect} />);
  wrapper.simulate('click');
  td.verify(handleSelect('123'), {times: 1});
});

test('renders leading icon', () => {
  const leadingIcon = <i className='leading-icon'></i>;
  const wrapper = shallow(<Chip leadingIcon={leadingIcon} />);
  assert.equal(wrapper.children().first().type(), 'i');
});

test('renders leading icon with class name', () => {
  const leadingIcon = <i className='leading-icon'></i>;
  const wrapper = shallow(<Chip leadingIcon={leadingIcon} />);
  assert.isTrue(wrapper.children().first().hasClass('leading-icon'));
});

test('renders leading icon with base class names', () => {
  const leadingIcon = <i className='leading-icon'></i>;
  const wrapper = shallow(<Chip leadingIcon={leadingIcon} />);
  assert.isTrue(wrapper.children().first().hasClass('mdc-chip__icon'));
  assert.isTrue(wrapper.children().first().hasClass('mdc-chip__icon--leading'));
});

test('renders remove icon', () => {
  const removeIcon = <i className='remove-icon'></i>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  assert.equal(wrapper.children().last().type(), 'i');
});

test('renders remove icon with class name', () => {
  const removeIcon = <i className='remove-icon'></i>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  assert.isTrue(wrapper.children().last().hasClass('remove-icon'));
});

test('renders remove icon with base class names', () => {
  const removeIcon = <i className='remove-icon'></i>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  assert.isTrue(wrapper.children().last().hasClass('mdc-chip__icon'));
  assert.isTrue(wrapper.children().last().hasClass('mdc-chip__icon--trailing'));
});

test('remove icon click calls #foundation.handleTrailingIconInteraction', () => {
  const removeIcon = <i className='remove-icon'></i>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  wrapper.instance().foundation_.handleTrailingIconInteraction = td.func();
  const evt = {};
  wrapper.children().last().simulate('click', evt);
  td.verify(wrapper.instance().foundation_.handleTrailingIconInteraction(evt), {times: 1});
});

test('remove icon keydown calls #foundation.handleTrailingIconInteraction', () => {
  const removeIcon = <i className='remove-icon'></i>;
  const wrapper = shallow(<Chip removeIcon={removeIcon} />);
  wrapper.instance().foundation_.handleTrailingIconInteraction = td.func();
  const evt = {};
  wrapper.children().last().simulate('keydown', evt);
  td.verify(wrapper.instance().foundation_.handleTrailingIconInteraction(evt), {times: 1});
});

test('renders chip checkmark if it exists', () => {
  const wrapper = mount(<Chip chipCheckmark={<ChipCheckmark/>} />);
  assert.equal(wrapper.find('.mdc-chip__checkmark').length, 1);
});

test('renders custom chip checkmark', () => {
  const wrapper = shallow(<Chip chipCheckmark={<div className='meow-class'/>} />);
  assert.equal(wrapper.find('.meow-class').length, 1);
});

test('adds mdc-chip--selected class if selected prop is true', () => {
  const wrapper = shallow(<Chip selected />);
  assert.exists(wrapper.hasClass('mdc-chip--selected'));
});

test('renders chip', () => {
  const wrapper = shallow(<Chip/>);
  assert.isTrue(wrapper.find('.mdc-chip').length === 1);
});

test('renders label text', () => {
  const wrapper = shallow(<Chip label='Hello Jane' />);
  assert.equal(wrapper.find('.mdc-chip__text').text(), 'Hello Jane');
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<Chip />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
