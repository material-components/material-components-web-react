import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Subtitle2} from '../../../packages/typography/index';

suite('TypographySubtitle2');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Subtitle2 className='test-class-name'>Text</Subtitle2>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--subtitle2'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Subtitle2 tag='p'>Text</Subtitle2>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Subtitle2 disabled={true} label='test-prop'>
      Children
    </Subtitle2>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
