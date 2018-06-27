import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import {Chip} from '../../../packages/chips';

suite('Chip');

test('classNames adds classes', () => {
  const wrapper = mount(<Chip className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders chip', () => {
  const wrapper = mount(<Chip>Hello world</Chip>);
  assert.exists(wrapper.find('.mdc-chip'));
});

test('#adapter.addClass adds class to state.classList', () => {
  const wrapper = mount(<Chip>Jane Doe</Chip>);
  wrapper.instance().foundation_.adapter_.addClass('test-class-name');
  assert.isTrue(wrapper.state().classList.has('test-class-name'));
});

test('#adapter.removeClass removes class from state.classList', () => {
  const wrapper = mount(<Chip>Jane Doe</Chip>);
  const classList = new Set();
  classList.add('test-class-name');
  wrapper.setState({classList});
  wrapper.instance().foundation_.adapter_.removeClass('test-class-name');
  assert.isFalse(wrapper.state().classList.has('test-class-name'));
});
