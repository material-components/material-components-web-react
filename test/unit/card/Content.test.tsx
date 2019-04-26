import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';
import {CardPrimaryContent} from '../../../packages/card/index';
import {createMockRaf} from '../helpers/raf';

suite('CardPrimaryContent');

test('classNames adds classes', () => {
  const wrapper = mount(<CardPrimaryContent className='test-class-name' />);
  const primaryContentDiv = wrapper.find('.mdc-card__primary-action');
  assert.isTrue(primaryContentDiv.hasClass('test-class-name'));
  assert.equal(primaryContentDiv.length, 1);
});

test('it should contain mdc-ripple-upgraded', () => {
  const mockRaf = createMockRaf();
  const wrapper = mount(<CardPrimaryContent />);
  mockRaf.flush();
  assert.isTrue(
    wrapper
      .update()
      .find('.mdc-card__primary-action')
      .hasClass('mdc-ripple-upgraded')
  );
  mockRaf.restore();
});
