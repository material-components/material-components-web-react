import * as React from 'react';
import {assert} from 'chai';
import * as td from 'testdouble';
import {shallow} from 'enzyme';
// @ts-ignore
import {IconButtonBase as IconButton, ButtonProps} from '../../../packages/icon-button/index.tsx';

suite('IconButton');

test('classNames adds classes', () => {
  const wrapper = shallow(<IconButton className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-icon-button'));
});

test('renders child', () => {
  const wrapper = shallow(
    <IconButton>
      <i className='test-icon' />
    </IconButton>
  );
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

test('#foundation.handleClick gets called onClick', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  wrapper.instance().foundation_.handleClick = td.func();
  wrapper.simulate('click');
  td.verify(wrapper.instance().foundation_.handleClick(), {times: 1});
});

test('props.onClick gets called onClick', () => {
  const onClick = td.func() as (event: React.MouseEvent) => void;
  const wrapper = shallow(<IconButton onClick={onClick} />);
  const evt = {} as React.MouseEvent;
  wrapper.simulate('click', evt);
  td.verify(onClick(evt), {times: 1});
});

test('aria-pressed is set true if passed as prop and on className is passed', () => {
  const wrapper = shallow(
    <IconButton aria-pressed className='mdc-icon-button--on' />
  );
  assert.equal(wrapper.props()['aria-pressed'], 'true');
});

test('aria-pressed is set false if passed as prop but on className is not passed', () => {
  const wrapper = shallow(<IconButton aria-pressed />);
  assert.equal(wrapper.props()['aria-pressed'], 'false');
});

test('#get.classes has a class added to state.classList', () => {
  const wrapper = shallow(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.hasClass('test-class');
});

test('#adapter.addClass adds a class to state.classList', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  wrapper.instance().adapter.addClass('test-class');
  wrapper.state().classList.has('test-class');
});

test('#adapter.removeClass removes a class to state.classList', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if element contains class', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.hasClass returns false if element does not contains class', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  assert.isFalse(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.setAttr sets aria-pressed', () => {
  const wrapper = shallow<IconButton<ButtonProps>>(<IconButton />);
  wrapper.instance().adapter.setAttr('aria-pressed', true);
  assert.isTrue(wrapper.state()['aria-pressed']);
});

