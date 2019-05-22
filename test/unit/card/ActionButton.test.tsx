import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {CardActionButtons} from '../../../packages/card/index';

suite('CardActionButtons');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <CardActionButtons className='test-class-name'>
      <div>test</div>
    </CardActionButtons>
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-card__action-buttons'));
});

test('adds correct classes to children', () => {
  const wrapper = shallow(
    <CardActionButtons>
      <button className='one' />
      <button className='two' />
    </CardActionButtons>
  );
  assert.equal(wrapper.find('.mdc-card__action').length, 2);
  assert.equal(wrapper.find('.mdc-card__action--button').length, 2);
  assert.equal(wrapper.find('.one').length, 1);
  assert.equal(wrapper.find('.two').length, 1);
});

test('the add classes to children function, keeps custom props', () => {
  const wrapper = shallow(
    <CardActionButtons>
      <button disabled={true} aria-label='test-prop' />
    </CardActionButtons>
  );
  const button = wrapper.find('.mdc-card__action');
  assert.isTrue(button.props().disabled);
  assert.equal(button.props()['aria-label'], 'test-prop');
});
