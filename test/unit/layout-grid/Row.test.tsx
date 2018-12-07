import {assert} from 'chai';
import {shallow} from 'enzyme';
import * as React from 'react';
// @ts-ignore
import {Row} from '../../../packages/layout-grid/index.tsx';

suite('LayoutGridRow');

test('classNames adds classes', () => {
  const wrapper = shallow(<Row className="test-class-name">Children</Row>, {
    disableLifecycleMethods: true,
  });
  assert.isTrue(wrapper.hasClass('mdc-layout-grid__inner'));
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('keeps custom props', () => {
  const wrapper = shallow(
    <Row propOne={true} propTwo="test-prop">
      Children
    </Row>,
    {disableLifecycleMethods: true}
  );
  assert.isTrue(wrapper.props().propOne);
  assert.equal(wrapper.props().propTwo, 'test-prop');
});
