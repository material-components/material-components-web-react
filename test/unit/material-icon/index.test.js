import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import MaterialIcon from '../../../packages/material-icon';

suite('MaterialIcon');

test('classNames adds classes', () => {
  const wrapper = shallow(<MaterialIcon className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('material-icons'));
});

test('has icon type as child', () => {
  const wrapper = shallow(<MaterialIcon icon='menu' />);
  assert.equal(wrapper.text(), 'menu');
});
