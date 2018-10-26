import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import {Headline4} from '../../../packages/typography/index';

suite('TypographyHeadline4');

test('classNames adds classes', () => {
  const wrapper = shallow(<Headline4 className='test-class-name'>Text</Headline4>, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline4'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline4 tag="p">Text</Headline4>, {disableLifecycleMethods: true});
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline4 propOne={true} propTwo='test-prop'>Children</Headline4>,
    {disableLifecycleMethods: true},
  );
  assert.isTrue(wrapper.props().propOne);
  assert.equal(wrapper.props().propTwo, 'test-prop');
});
