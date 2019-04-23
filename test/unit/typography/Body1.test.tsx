import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Body1} from '../../../packages/typography/index';

suite('TypographyBody1');

test('classNames adds classes', () => {
  const wrapper = shallow(<Body1 className='test-class-name'>Text</Body1>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--body1'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Body1 tag='h1'>Text</Body1>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'h1');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Body1 disabled={true} label='test-prop'>
      Children
    </Body1>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
