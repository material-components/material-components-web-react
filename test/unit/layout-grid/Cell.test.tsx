import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Cell} from '../../../packages/layout-grid/index';

suite('LayoutGridCell');

test('classNames adds classes', () => {
  const wrapper = shallow(<Cell className='test-class-name' />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('align prop adds correct className', () => {
  const wrapper = shallow(<Cell align='bottom' />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--align-bottom'));
});

test('columns prop adds correct className', () => {
  const wrapper = shallow(<Cell columns={4} />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--span-4'));
});

test('desktopColumns prop adds correct className', () => {
  const wrapper = shallow(<Cell desktopColumns={4} />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--span-4-desktop'));
});

test('order prop adds correct className', () => {
  const wrapper = shallow(<Cell order={12} />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--order-12'));
});

test('phoneColumns prop adds correct className', () => {
  const wrapper = shallow(<Cell phoneColumns={4} />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--span-4-phone'));
});

test('tabletColumns prop adds correct className', () => {
  const wrapper = shallow(<Cell tabletColumns={4} />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell'));
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__cell--span-4-tablet'));
});

test('keeps custom props', () => {
  const wrapper = shallow(<Cell disabled={true} label='test-prop' />, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().label, 'test-prop');
});
