import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import Card from '../../../packages/card';

suite('Card');

test('classNames adds classes', () => {
  const wrapper = shallow(<Card className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card'));
});

test('stroked prop adds correct classname', () => {
  const wrapper = shallow(<Card stroked/>);
  assert.isTrue(wrapper.hasClass('mdc-card'));
  assert.isTrue(wrapper.hasClass('mdc-card--stroked'));
});
