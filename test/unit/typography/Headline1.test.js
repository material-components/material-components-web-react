import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import {Headline1} from '../../../packages/typography/index';

suite('TypographyHeadline1');

test('classNames adds classes', () => {
  const wrapper = shallow(<Headline1 className='test-class-name'>Text</Headline1>, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline1'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline1 tag="p">Text</Headline1>, {disableLifecycleMethods: true});
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline1 propOne={true} propTwo='test-prop'>Children</Headline1>,
    {disableLifecycleMethods: true},
  );
  assert.isTrue(wrapper.props().propOne);
  assert.equal(wrapper.props().propTwo, 'test-prop');
});
