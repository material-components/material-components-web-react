import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Headline2} from '../../../packages/typography/index';

suite('TypographyHeadline2');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Headline2 className='test-class-name'>Text</Headline2>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline2'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline2 tag='p'>Text</Headline2>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline2 disabled={true} label='test-prop'>
      Children
    </Headline2>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
