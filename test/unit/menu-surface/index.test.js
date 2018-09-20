import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import MenuSurface from '../../../packages/menu-surface/index';

suite('MenuSurface');

test('classNames adds classes', () => {
  const wrapper = shallow(<MenuSurface className='test-class-name'/>);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-menu-surface'))
});

test('classList adds classes', () => {
  const wrapper = shallow(<MenuSurface />);
  wrapper.setState({classList: new Set(['test-class-name'])})
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('props.fixed adds fixed class', () => {
  const wrapper = shallow(<MenuSurface fixed />);
  assert.isTrue(wrapper.hasClass('mdc-menu-surface--fixed'));
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<MenuSurface />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
