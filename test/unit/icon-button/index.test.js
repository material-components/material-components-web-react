import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import {IconButtonBase as IconButton} from '../../../packages/icon-button';

suite('IconButton');

test('classNames adds classes', () => {
  const wrapper = shallow(<IconButton className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-icon-button'));
});

test('renders child', () => {
  const wrapper = shallow(<IconButton><i className='test-icon' /></IconButton>);
  assert.equal(wrapper.find('.test-icon').length, 1);
});

test('renders button tag as default', () => {
  const wrapper = shallow(<IconButton />);
  assert.equal(wrapper.getElement().type, 'button');
});

test('renders anchor tag when isLink is true', () => {
  const wrapper = shallow(<IconButton isLink />);
  assert.equal(wrapper.getElement().type, 'a');
});

test('#foundation.toggle gets called onClick', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.instance().foundation_.toggle = td.func();
  wrapper.simulate('click');
  td.verify(wrapper.instance().foundation_.toggle(), {times: 1});
});

test('props.onClick gets called onClick', () => {
  const onClick = td.func();
  const wrapper = shallow(<IconButton onClick={onClick} />);
  const evt = {test: 'test'};
  wrapper.simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('aria-label is set if passed as props', () => {
  const ariaLabel = 'test-label';
  const wrapper = shallow(<IconButton aria-label={ariaLabel} />);
  assert.equal(wrapper.props()['aria-label'], ariaLabel);
});

test('aria-pressed is set if passed as props', () => {
  const wrapper = shallow(<IconButton aria-pressed />);
  assert.isTrue(wrapper.props()['aria-pressed']);
});

test('#get.classes has a class added to state.classList', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.hasClass('test-class');
});

test('#adapter.addClass adds a class to state.classList', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.instance().adapter.addClass('test-class');
  wrapper.state().classList.has('test-class');
});

test('#adapter.removeClass removes a class to state.classList', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.getAttr gets data attributes', () => {
  const dataTestAttr = 'remove favorite';
  const wrapper = shallow(<IconButton data-test-attr={dataTestAttr}/>);
  assert.equal(wrapper.instance().adapter.getAttr('data-test-attr'), dataTestAttr);
});

test('#adapter.setAttr sets aria-pressed', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.instance().adapter.setAttr('aria-pressed', true);
  assert.isTrue(wrapper.state()['aria-pressed']);
});

test('#adapter.setAttr sets aria-label', () => {
  const ariaLabel = 'aria-label';
  const wrapper = shallow(<IconButton />);
  wrapper.instance().adapter.setAttr('aria-label', ariaLabel);
  assert.equal(wrapper.state()['aria-label'], ariaLabel);
});

test('#adapter.setText replaces props.children', () => {
  const wrapper = shallow(<IconButton><i className='test-class' /></IconButton>);
  wrapper.instance().adapter.setText(<i className='better-classname' />);
  wrapper.update();
  assert.equal(wrapper.find('.better-classname').length, 1);
  assert.equal(wrapper.find('.test-class').length, 0);
});

test('default initRipple function', () => {
  IconButton.defaultProps.initRipple = td.func();
  mount(<IconButton />);
  td.verify(IconButton.defaultProps.initRipple(td.matchers.isA(Object)), {times: 1});
});
