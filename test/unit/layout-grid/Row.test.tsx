import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import {Row} from '../../../packages/layout-grid/index';

suite('LayoutGridRow');

test('classNames adds classes', () => {
  const wrapper = shallow(<Row className='test-class-name'>Children</Row>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__inner'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Row disabled={true} type='test-prop'>
      Children
    </Row>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().disabled);
  assert.equal(wrapper.props().type, 'test-prop');
});
