import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import ThumbUnderlay from '../../../packages/switch/ThumbUnderlay';
import {coerceForTesting} from '../helpers/types';

suite('Switch Thumb Underlay');

test('has mdc-switch__thumb-underlay class', () => {
  const rippleActivator = coerceForTesting<React.RefObject<HTMLInputElement>>({
    current: <input />,
  });
  const wrapper = mount(<ThumbUnderlay rippleActivator={rippleActivator} />);
  assert.exists(wrapper.find('.mdc-switch__thumb-underlay'));
});

test('classNames adds classes', () => {
  const rippleActivator = coerceForTesting<React.RefObject<HTMLInputElement>>({
    current: <input />,
  });
  const wrapper = mount(
    <ThumbUnderlay
      className='test-class-name'
      rippleActivator={rippleActivator}
    />
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});
