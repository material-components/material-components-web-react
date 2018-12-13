import {assert} from 'chai';
import {shallow} from 'enzyme';
import * as React from 'react';
// @ts-ignore
import {Grid} from '../../../packages/layout-grid/index.tsx';

suite('LayoutGridGrid');

test('classNames adds classes', () => {
  const wrapper = shallow(<Grid className="test-class-name">Children</Grid>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('align prop adds correct className', () => {
  const wrapper = shallow(<Grid align="right">Children</Grid>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid--align-right'));
});

test('fixedColumnWidth prop adds correct className', () => {
  const wrapper = shallow(<Grid fixedColumnWidth>Children</Grid>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid--fixed-column-width'));
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Grid disabled={true} label="test-prop">
      Children
    </Grid>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
