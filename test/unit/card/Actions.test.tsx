import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardActions} from '../../../packages/card/index';

suite('CardActions');

test('classNames adds classes', () => {
  const wrapper = shallow(<CardActions className='test-class-name' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__actions'));
});

test('adds fullbleed class', () => {
  const wrapper = shallow(<CardActions fullBleed />);
  assert.isTrue(wrapper.hasClass('mdc-card__actions'));
  assert.isTrue(wrapper.hasClass('mdc-card__actions--full-bleed'));
});
