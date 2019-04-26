import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Headline5} from '../../../packages/typography/index';

suite('TypographyHeadline5');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Headline5 className='test-class-name'>Text</Headline5>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline5'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline5 tag='p'>Text</Headline5>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline5 disabled={true} label='test-prop'>
      Children
    </Headline5>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
