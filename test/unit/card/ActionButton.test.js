import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardActionButtons} from '../../../packages/card/index';

suite('CardActionButtons');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardActionButtons className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__action-buttons'));
});

test('adds correct classes to children', () => {
  const wrapper = shallow(<CardActionButtons>
    <button className='one'></button>
    <button className='two'></button>
  </CardActionButtons>);
  assert.equal(wrapper.find('.mdc-card__action').length, 2);
  assert.equal(wrapper.find('.mdc-card__action--button').length, 2);
  assert.equal(wrapper.find('.one').length, 1);
  assert.equal(wrapper.find('.two').length, 1);
});

test('the add classes to children function, keeps custom props', () => {
  const wrapper = shallow(<CardActionButtons>
    <button propOne={true} propTwo='test-prop'></button>
  </CardActionButtons>);
  const button = wrapper.find('.mdc-card__action');
  assert.isTrue(button.props().propOne);
  assert.equal(button.props().propTwo, 'test-prop');
});
