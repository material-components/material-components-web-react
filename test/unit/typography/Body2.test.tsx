import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Body2} from '../../../packages/typography/index';

suite('TypographyBody2');

test('classNames adds classes', () => {
  const wrapper = shallow(<Body2 className='test-class-name'>Text</Body2>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--body2'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Body2 tag='h2'>Text</Body2>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'h2');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Body2 disabled={true} label='test-prop'>
      Children
    </Body2>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
