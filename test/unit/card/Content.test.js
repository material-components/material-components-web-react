import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardContent} from '../../../packages/card';

suite('CardContent');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardContent className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__primary-action'));
});
