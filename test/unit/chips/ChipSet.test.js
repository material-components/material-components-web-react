import React from 'react';
import {assert} from 'chai';
import {shallow, mount} from 'enzyme';
import ChipSet from '../../../packages/chips/ChipSet';
import {Chip} from '../../../packages/chips/index';

suite('ChipSet');

test('creates foundation', () => {
  const wrapper = mount(<ChipSet />);
  assert.exists(wrapper.instance().foundation_);
});

test('creates foundation', () => {
  const wrapper = shallow(<ChipSet />);
  assert.exists(wrapper.instance().foundation_);
});

test('creates foundation', () => {
  const wrapper = shallow(<ChipSet>
    <Chip id='1'/>
  </ChipSet>);
  wrapper.setProps({selectedChipIds: ['1']})
  assert.exists(wrapper.instance().foundation_);
});

test('#componentWillUnmount destroys foundation', () => {
  const wrapper = shallow(<ChipSet />);
  const foundation = wrapper.instance().foundation_;
  foundation.destroy = td.func();
  wrapper.unmount();
  td.verify(foundation.destroy());
});
