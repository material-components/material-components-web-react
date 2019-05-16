import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {shallow} from 'enzyme';
import {IconButtonBase as IconButton} from '../../../packages/icon-button/index';
import {coerceForTesting} from '../helpers/types';
import {MDCIconButtonToggleEventDetail} from '@material/icon-button/types';

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
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  wrapper.instance().foundation.handleClick = td.func<() => void>();
  wrapper.simulate('click');
  td.verify(wrapper.instance().foundation.handleClick(), {times: 1});
});

test('props.onClick gets called onClick', () => {
  const onClick = coerceForTesting<(event: React.MouseEvent) => void>(
    td.func()
  );
  const wrapper = shallow(<IconButton onClick={onClick} />);
  const evt = coerceForTesting<React.MouseEvent>({});
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
  assert.isTrue(wrapper.hasClass('test-class'));
});

test('#adapter.addClass adds a class to state.classList', () => {
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  wrapper.instance().adapter.addClass('test-class');
  assert.isTrue(wrapper.state().classList.has('test-class'));
});

test('#adapter.removeClass removes a class to state.classList', () => {
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  wrapper.instance().adapter.removeClass('test-class');
  assert.isFalse(wrapper.state().classList.has('test-class'));
});

test('#adapter.hasClass returns true if element contains class', () => {
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  wrapper.setState({classList: new Set(['test-class'])});
  assert.isTrue(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.hasClass returns false if element does not contains class', () => {
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  assert.isFalse(wrapper.instance().adapter.hasClass('test-class'));
});

test('#adapter.setAttr sets aria-pressed', () => {
  const wrapper = shallow<IconButton<HTMLButtonElement>>(<IconButton />);
  wrapper.instance().adapter.setAttr('aria-pressed', 'true');
  assert.equal(wrapper.state('aria-pressed'), 'true');
});

test('#adapter.notifyChange calls props.handleChange', () => {
  const handleChange = td.func<
    (event: MDCIconButtonToggleEventDetail) => void
  >();
  const wrapper = shallow<IconButton<HTMLButtonElement>>(
    <IconButton handleChange={handleChange} />
  );
  const event = {isOn: false};
  wrapper.instance().adapter.notifyChange(event);
  td.verify(handleChange(event), {times: 1});
});
