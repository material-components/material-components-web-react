import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Button} from '../../../packages/typography/index';

suite('TypographyButton');

test('classNames adds classes', () => {
  const wrapper = shallow(<Button className='test-class-name'>Text</Button>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--button'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Button tag='h2'>Text</Button>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'h2');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Button disabled={true} label='test-prop'>
      Children
    </Button>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
