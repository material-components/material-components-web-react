import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Caption} from '../../../packages/typography/index';

suite('TypographyCaption');

test('classNames adds classes', () => {
  const wrapper = shallow(<Caption className='test-class-name'>Text</Caption>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--caption'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Caption tag='h2'>Text</Caption>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'h2');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Caption disabled={true} label='test-prop'>
      Children
    </Caption>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
