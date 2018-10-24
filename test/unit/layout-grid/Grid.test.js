import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';

import {Grid} from '../../../packages/layout-grid/index';

suite('LayoutGridGrid');

test('classNames adds classes', () => {
  const wrapper = shallow(<Grid className='test-class-name' />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('align prop adds correct className', () => {
  const wrapper = shallow(<Grid align='right' />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid--align-right'));
});

test('fixedColumnWidth prop adds correct className', () => {
  const wrapper = shallow(<Grid fixedColumnWidth />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid--fixed-column-width'));
});

test('keeps custom props', () => {
  const wrapper = shallow(<Grid propOne={true} propTwo='test-prop' />, {disableLifecycleMethods: true});
  assert.isTrue(wrapper.props().propOne);
  assert.equal(wrapper.props().propTwo, 'test-prop');
});
