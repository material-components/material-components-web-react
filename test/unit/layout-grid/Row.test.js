import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import {Row} from '../../../packages/layout-grid/index';

suite('LayoutGridRow');

test('classNames adds classes', () => {
  const wrapper = shallow(<Row className='test-class-name' />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__inner'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('keeps custom props', () => {
  const wrapper = shallow(<Row propOne={true} propTwo='test-prop' />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.props().propOne);
  assert.equal(wrapper.props().propTwo, 'test-prop');
});
