import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {IconToggle} from '../../../packages/icon-button/index';

suite('IconButtonIconToggle');

test('classNames adds classes', () => {
  const wrapper = shallow(<IconToggle className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has icon button icon class', () => {
  const wrapper = shallow(<IconToggle className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('mdc-icon-button__icon'));
});

test('has icon button on icon class if props.isOn is true', () => {
  const wrapper = shallow(<IconToggle isOn className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('mdc-icon-button__icon--on'));
});

test('renders icon', () => {
  const wrapper = shallow(
    <IconToggle>
      <i className='test-icon' />
    </IconToggle>
  );
  assert.equal(
    wrapper
      .children()
      .first()
      .type(),
    'i'
  );
});

test('renders svg', () => {
  const wrapper = shallow(
    <IconToggle>
      <svg className='test-svg' />
    </IconToggle>
  );
  assert.equal(
    wrapper
      .children()
      .first()
      .type(),
    'svg'
  );
});

test('renders img', () => {
  const wrapper = shallow(
    <IconToggle>
      <img className='test-img' />
    </IconToggle>
  );
  assert.equal(
    wrapper
      .children()
      .first()
      .type(),
    'img'
  );
});
