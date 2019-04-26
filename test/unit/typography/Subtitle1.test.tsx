import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Subtitle1} from '../../../packages/typography/index';

suite('TypographySubtitle1');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Subtitle1 className='test-class-name'>Text</Subtitle1>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--subtitle1'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Subtitle1 tag='p'>Text</Subtitle1>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Subtitle1 disabled={true} label='test-prop'>
      Children
    </Subtitle1>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
