import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Headline6} from '../../../packages/typography/index';

suite('TypographyHeadline6');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Headline6 className='test-class-name'>Text</Headline6>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline6'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline6 tag='p'>Text</Headline6>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline6 disabled={true} label='test-prop'>
      Children
    </Headline6>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
