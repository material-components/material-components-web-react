import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Overline} from '../../../packages/typography/index';

suite('TypographyOverline');

test('classNames adds classes', () => {
  const wrapper = shallow(
    <Overline className='test-class-name'>Text</Overline>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.hasClass('mdc-typography'));
  assert.isTrue(wrapper.hasClass('mdc-typography--overline'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('renders a different tag', () => {
  const wrapper = shallow(<Overline tag='p'>Text</Overline>, {
    disableLifecycleMethods: true,
  });
  assert.equal(wrapper.type(), 'p');
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Overline disabled={true} label='test-prop'>
      Children
    </Overline>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
