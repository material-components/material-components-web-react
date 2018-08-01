import React from 'react';
import {assert} from 'chai';
import td from 'testdouble';
import {mount, shallow} from 'enzyme';
import NotchedOutline from '../../../packages/notched-outline/index';

suite('NotchedOutline');

test('classNames adds classes', () => {
  const wrapper = shallow(<NotchedOutline className='test-class-name'/>);
  const outlineElement = wrapper.first().first();
  assert.isTrue(outlineElement.hasClass('mdc-notched-outline'));
  assert.isTrue(outlineElement.hasClass('test-class-name'));
});
