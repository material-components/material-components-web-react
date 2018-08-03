import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardPrimaryContent} from '../../../packages/card/index';

suite('CardPrimaryContent');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardPrimaryContent className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__primary-action'));
});
