import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardActionIcons} from '../../../packages/card';

suite('CardActionIcons');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardActionIcons className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__action-icons'));
});

test('adds correct classes to children', () => {
  const wrapper = shallow(<CardActionIcons>
    <i className='one'></i>
    <i className='two'></i>
  </CardActionIcons>);
  assert.equal(wrapper.find('.mdc-card__action').length, 2);
  assert.equal(wrapper.find('.mdc-card__action--icon').length, 2);
  assert.equal(wrapper.find('.one').length, 1);
  assert.equal(wrapper.find('.two').length, 1);
});

test('the add classes to children function, keeps custom props', () => {
  const wrapper = shallow(<CardActionIcons>
    <i propOne={true} propTwo='test-prop'></i>
  </CardActionIcons>);
  const button = wrapper.find('.mdc-card__action');
  assert.isTrue(button.props().propOne);
  assert.equal(button.props().propTwo, 'test-prop');
});
