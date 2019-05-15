import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {Button} from '../../../packages/button/index';
import {coerceForTesting} from '../helpers/types';

suite('Button');

test('classNames adds classes', () => {
  const wrapper = shallow(<Button className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-button'));
});

test('does not render icon if props.icon is null and props.trailingIcon is null', () => {
  const wrapper = shallow(<Button />);
  assert.equal(wrapper.find('.mdc-button__icon').length, 0);
});

test('renders an icon', () => {
  const icon = <i className='test-icon' />;
  const wrapper = shallow(<Button icon={icon} />);
  assert.isTrue(wrapper.find('.test-icon').hasClass('mdc-button__icon'));
});

test('renders a trailing icon', () => {
  const icon = <i className='test-icon' />;
  const wrapper = shallow(<Button trailingIcon={icon} />);
  assert.isTrue(wrapper.find('.test-icon').hasClass('mdc-button__icon'));
});

test('renders a link with trailing icon', () => {
  const icon = <i className='test-icon' />;
  const wrapper = shallow(<Button href='/' trailingIcon={icon} />);
  assert.isTrue(wrapper.find('.test-icon').hasClass('mdc-button__icon'));
});

test('renders a raised button', () => {
  const wrapper = shallow(<Button raised />);
  assert.isTrue(wrapper.hasClass('mdc-button--raised'));
});

test('renders a unelevated button', () => {
  const wrapper = shallow(<Button unelevated />);
  assert.isTrue(wrapper.hasClass('mdc-button--unelevated'));
});

test('renders an outlined button', () => {
  const wrapper = shallow(<Button outlined />);
  assert.isTrue(wrapper.hasClass('mdc-button--outlined'));
});

test('renders a dense button', () => {
  const wrapper = shallow(<Button dense />);
  assert.isTrue(wrapper.hasClass('mdc-button--dense'));
});

test('renders a button tag', () => {
  const wrapper = shallow(<Button />);
  assert.equal(wrapper.type(), 'button');
});

test('renders a button with an anchor tag', () => {
  const wrapper = shallow(<Button href='https://www.google.com' />);
  assert.equal(wrapper.type(), 'a');
});

test('renders a button with a button attribute', () => {
  const wrapper = shallow(<Button type='submit' />);
  assert.equal(wrapper.prop('type'), 'submit');
});

test('renders a button with an anchor attribute', () => {
  const wrapper = shallow(<Button download />);
  assert.equal(wrapper.prop('download'), true);
});

test('default initRipple function', () => {
  const initRipple = coerceForTesting<(surface: HTMLButtonElement) => {}>(
    td.func()
  );
  mount(<Button initRipple={initRipple} />);
  td.verify(initRipple(td.matchers.isA(Object)), {
    times: 1,
  });
});
