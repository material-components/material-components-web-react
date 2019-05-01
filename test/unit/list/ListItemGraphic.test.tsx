import React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {ListItemGraphic} from '../../../packages/list/index';

suite('ListItemGraphic');

test('className adds classes', () => {
  const wrapper = shallow(
    <ListItemGraphic graphic={<i />} className='test-class-name' />
  );
  assert.isTrue(wrapper.hasClass('test-class-name'));
});

test('has mdc-list-item__graphic class', () => {
  const wrapper = shallow(<ListItemGraphic graphic={<i />} />);
  assert.isTrue(wrapper.hasClass('mdc-list-item__graphic'));
});
