import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Headline3} from '../../../packages/typography/index';

suite('TypographyHeadline3');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Headline3 className='test-class-name'>Text</Headline3>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--headline3'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Headline3 tag='p'>Text</Headline3>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Headline3 disabled={true} label='test-prop'>
      Children
    </Headline3>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
